/* eslint-disable camelcase */
import { MTGItem, ScryfallError, ScryfallSearch } from './typings.d';

interface ScryfallCardSelection {
  [key: string]: MTGItem;
}

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

    if (response.warnings) {
      const { warnings } = response as ScryfallError;

      throw `(updateMTGItem): \n ${warnings.map(err => err).join('\n')}`;
    }

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
          colors,
          type,
          set,
          set_name,
          oracle_text,
          flavor_text: flavor_text || null,
          rarity,
          collector_number,
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
