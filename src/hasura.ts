import {
  CountColumn,
  HasuraErrors,
  HasuraInsertResp,
  HasuraQueryAggregateResp,
  HasuraQueryResp,
  HasuraUpdateResp,
  MTGItem,
  RecordColumnAggregateCount,
} from './typings.d';

const objToQueryString = (obj: { [key: string]: any }) => {
  const cleanObj = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, val]) => Boolean(val))
  );
  const columns = Object.keys(cleanObj).map(key => {
    const value = obj[key];
    const fmtValue =
      typeof value === 'string'
        ? `"${value
            .replace(/\\/g, '')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')}"`
        : Array.isArray(value)
        ? `"{${value.join(',')}}"`
        : value;

    return `${key}: ${fmtValue}`;
  });

  return columns;
};

const countUnique = (iterable: string[]) =>
  iterable.reduce((acc: RecordColumnAggregateCount, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

const countUniqueSorted = (iterable: string[]) =>
  // sort descending by count
  Object.entries(countUnique(iterable))
    .sort((a, b) => b[1] - a[1])
    .reduce(
      (acc: RecordColumnAggregateCount, [key, val]) =>
        ({ ...acc, [key]: val } as RecordColumnAggregateCount),
      {}
    );

/**
 * Get mtg entries from Hasura.
 * @function
 * @async
 *
 * @returns {Promise<MTGItem[]>}
 */
export const queryMTGItems = async (): Promise<MTGItem[]> => {
  const query = `
    {
      media_mtg(order_by: {name: asc}) {
        name
        colors
        type
        set
        set_name
        oracle_text
        flavor_text
        rarity
        collector_number
        artist
        released_at
        image
        id
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryMTGItems): \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraQueryResp).data.media_mtg;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get aggregated count of mtg column from Hasura.
 * @function
 * @async
 *
 * @param {string} column
 * @returns {Promise<RecordColumnAggregateCount>}
 */
export const queryMTGAggregateCount = async (
  column: CountColumn
): Promise<RecordColumnAggregateCount> => {
  const query = `
    {
      media_mtg(order_by: {${column}: asc}) {
        ${column}
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: any = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryMTGAggregateCount): \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    const data = (response as HasuraQueryAggregateResp).data.media_mtg;
    const collection = data.map(item => item[column]);

    return countUniqueSorted(collection);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Search mtg entries from Hasura.
 * @function
 * @async
 *
 * @param {string} term mtg item name
 * @returns {Promise<MTGItem[]>}
 */
export const searchMTGItems = async (pattern: string): Promise<MTGItem[]> => {
  const query = `
    {
      media_mtg(
        order_by: {name: asc},
        where: {name: {_iregex: ".*${pattern}.*"}}
      ) {
        name
        colors
        type
        set
        set_name
        oracle_text
        flavor_text
        rarity
        collector_number
        artist
        released_at
        image
        id
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(searchMTGItems): \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraQueryResp).data.media_mtg;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Add mtg entry to Hasura.
 * @function
 * @async
 *
 * @param {MTGItem} item data to upload
 * @returns {Promise<string>}
 */
export const addMTGItem = async (item: MTGItem): Promise<string> => {
  try {
    const existing = await searchMTGItems(item.name);

    if (existing?.length !== 0) {
      throw `(addMTGItem): MTG item already exists.`;
    }

    const query = `
      mutation {
        insert_media_mtg_one(object: : { ${objToQueryString(item)} }) {
          name
        }
      }
    `;
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraInsertResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(addMTGItem): \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraInsertResp).data.insert_media_mtg_one.name;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Update mtg entry to Hasura.
 * @function
 * @async
 *
 * @param {string} id item id
 * @param {MTGItem} item data to update
 * @returns {Promise<string>}
 */
export const updateMTGItem = async (
  id: string,
  item: MTGItem
): Promise<string[]> => {
  const query = `
    mutation {
      update_media_mtg(
        where: {id: {_eq: "${id}"}},
        _set: : { ${objToQueryString(item)} }
      ) {
        returning {
          name
        }
      }
    }
  `;

  try {
    const request = await fetch(`${HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraUpdateResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(updateMTGItem): \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraUpdateResp).update_media_mtg.returning.map(
      ({ name }) => name
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
