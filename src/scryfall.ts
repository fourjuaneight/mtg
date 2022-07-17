/* eslint-disable camelcase */
import {
  MTGItem,
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
 * @param {string} term search term
 * @returns {Promise<ScryfallCardSelection[]>}
 */
export const searchCard = async (
  term: string
): Promise<ScryfallCardSelection[]> => {
  const query = encodeURIComponent(term);

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
    const response: ScryfallSearch | ScryfallError = await request.json();

    if (response.object === 'error') {
      const { details, warnings } = response as ScryfallError;
      const errMsg = warnings ? warnings.join('\n') : details;

      throw `(updateMTGItem): \n ${errMsg}`;
    }

    console.log({ query }, response);

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
            colors.length !== 0 ? colors.map(color => magicColors[color]) : null,
          type,
          set: set.toUpperCase(),
          set_name,
          oracle_text,
          flavor_text: flavor_text || '',
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
    const selection: ScryfallCardSelection[] = cards.reduce((acc, card) => {
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
