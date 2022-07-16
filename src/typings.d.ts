/* eslint-disable camelcase */
// SCRYFALL
export interface Preview {
  source: string;
  previewed_at: string;
  source_uri: string;
}

export interface Legalities {
  gladiator: string;
  historicbrawl: string;
  explorer: string;
  vintage: string;
  oldschool: string;
  legacy: string;
  pauper: string;
  standard: string;
  modern: string;
  penny: string;
  brawl: string;
  duel: string;
  paupercommander: string;
  premodern: string;
  alchemy: string;
  future: string;
  commander: string;
  historic: string;
  pioneer: string;
}

export interface RelatedUris {
  tcgplayer_infinite_decks: string;
  edhrec: string;
  gatherer: string;
  tcgplayer_infinite_articles: string;
}

export interface PurchaseUris {
  cardhoarder: string;
  cardmarket: string;
  tcgplayer: string;
}

export interface ImageUris {
  large: string;
  border_crop: string;
  normal: string;
  art_crop: string;
  small: string;
  png: string;
}

export interface Prices {
  tix: string;
  usd_etched?: null;
  eur: string;
  eur_foil: string;
  usd: string;
  usd_foil: string;
}

export interface ScryfallCardData {
  rarity: string;
  artist: string;
  frame: string;
  power?: string;
  uri: string;
  id: string;
  tcgplayer_id: number;
  digital: boolean;
  cmc: number;
  penny_rank: number;
  preview: Preview;
  collector_number: string;
  layout: string;
  set_id: string;
  full_art: boolean;
  nonfoil: boolean;
  textless: boolean;
  border_color: string;
  set_uri: string;
  finishes?: string[] | null;
  set_search_uri: string;
  legalities: Legalities;
  illustration_id: string;
  games?: string[] | null;
  oracle_id: string;
  oracle_text: string;
  image_status: string;
  reserved: boolean;
  mtgo_id: number;
  mana_cost: string;
  prints_search_uri: string;
  colors?: string[] | null;
  name: string;
  cardmarket_id: number;
  related_uris: RelatedUris;
  card_back_id: string;
  oversized: boolean;
  scryfall_set_uri: string;
  color_identity?: string[] | null;
  type_line: string;
  purchase_uris: PurchaseUris;
  object: string;
  scryfall_uri: string;
  set_name: string;
  edhrec_rank: number;
  multiverse_ids?: number[] | null;
  set: string;
  foil: boolean;
  released_at: string;
  rulings_uri: string;
  toughness?: string;
  image_uris: ImageUris;
  promo: boolean;
  booster: boolean;
  story_spotlight: boolean;
  set_type: string;
  variation: boolean;
  keywords?: string[] | null;
  artist_ids?: string[] | null;
  flavor_text?: string;
  prices: Prices;
  highres_image: boolean;
  lang: string;
  reprint: boolean;
}

export interface ScryfallSearchResponse {
  has_more: boolean;
  object: string;
  data: ScryfallCardData[];
  total_cards: number;
}

export interface ScryfallError {
  object: string;
  code: string;
  status: number;
  warnings: string[];
  details: string;
}

// HASURA
export enum MagicColor {
  White = 'W',
  Blue = 'U',
  Black = 'B',
  Red = 'R',
  Green = 'G',
}

export interface MTGItem {
  id?: string;
  name: string;
  colors: string[];
  type: string;
  set: string;
  set_name: string;
  oracle_text: string;
  flavor_text: string | null;
  rarity: string;
  collector_number: number;
  artist: string;
  released_at: date;
  image: string;
}

export type CountColumn = 'artist' | 'rarity' | 'set';

export interface RecordColumnAggregateCount {
  [key: string]: number;
}

export interface HasuraInsertResp {
  data: {
    insert_media_mtg_one: {
      name: string;
    };
  };
}

export interface HasuraUpdateResp {
  update_media_mtg: {
    returning: {
      name: string;
    }[];
  };
}

export interface HasuraQueryResp {
  data: {
    media_mtg: MTGItem[];
  };
}

export interface HasuraQueryAggregateResp {
  data: {
    media_mtg: {
      [key: string]: string;
    }[];
  };
}

export interface HasuraQueryTagsResp {
  data: {
    [key: string]: { name: string }[];
  };
}

export interface HasuraErrors {
  errors: {
    extensions: {
      path: string;
      code: string;
    };
    message: string;
  }[];
}

export interface RequestPayload {
  type: string;
  tagList?: string;
  data?: MTGItem;
  query?: string;
  countColumn?: CountColumn;
}
