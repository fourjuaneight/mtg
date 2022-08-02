/* eslint-disable id-length,  camelcase */
import {
  MTGItem,
  RequestQuery,
  ScryfallCardSelection,
  ScryfallError,
  ScryfallSearch,
} from './typings.d';

const magicColors: { [key: string]: string } = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
};

/**
 * Search Scryfall database for cards matching the given search pattern.
 * DOCS: https://scryfall.com/docs/api/cards/search
 * @function
 * @async
 *
 * @param {RequestQuery} queryTerm search data
 * @returns {Promise<ScryfallCardSelection>}
 */
export const searchCard = async (
  queryTerm: RequestQuery
): Promise<ScryfallCardSelection> => {
  // https://scryfall.com/docs/syntax
  const query = encodeURIComponent(
    `${queryTerm.name}s:${queryTerm.set}+cn:${queryTerm.number}`
  );

  try {
    const request = await fetch(
      `https://api.scryfall.com/cards/search?order=set&q=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (request.status !== 200) {
      throw `(searchCard): ${request.status} - ${request.statusText} | ${queryTerm.set}/${queryTerm.number}`;
    }

    const response: ScryfallSearch | ScryfallError = await request.json();

    if (response.object === 'error') {
      const { details, warnings } = response as ScryfallError;
      const errMsg = warnings ? warnings.join('\n') : details;

      throw `(searchCard): \n ${errMsg}`;
    }

    console.log({ query }, response);

    // eslint-disable-next-line no-control-regex
    const fmtPar = new RegExp('\n', 'g');
    const cards = (response as ScryfallSearch).data.map(
      ({
        artist,
        collector_number,
        colors,
        flavor_text,
        image_uris,
        name,
        oracle_text,
        rarity,
        released_at,
        set_name,
        set,
        type,
      }) => {
        const item: MTGItem = {
          name,
          colors:
            colors.length !== 0 ? colors.map(color => magicColors[color]) : [],
          type,
          set: set.toUpperCase(),
          set_name,
          oracle_text: oracle_text.replace(fmtPar, '\\n'),
          flavor_text: flavor_text?.replace(fmtPar, '\\n') || '',
          rarity,
          collector_number: parseInt(collector_number, 10),
          artist,
          released_at,
          image: image_uris.png,
        };

        return item;
      }
    );
    // cards keyed by name, set, and collector number
    const selection: ScryfallCardSelection = cards.reduce((acc, card) => {
      const { name, set, collector_number } = card;
      const key = `${name} - (${set}) #${collector_number}`;

      if (!acc[key]) {
        acc[key] = {
          [key]: card,
        };
      }

      return acc;
    }, {} as ScryfallCardSelection);

    return selection;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
