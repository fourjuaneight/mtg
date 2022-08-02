/* eslint-disable camelcase */
// HASURA
export interface MTGItem {
  id?: string;
  name: string;
  colors: string[] | null;
  type: string;
  set: string;
  set_name: string;
  oracle_text: string | null;
  flavor_text: string | null;
  rarity: string;
  collector_number: number;
  artist: string;
  released_at: string;
  image: string;
  back: string | null;
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

export interface HasuraErrors {
  errors: {
    extensions: {
      path: string;
      code: string;
    };
    message: string;
  }[];
}

export interface RequestQuery {
  name: string;
  set: string;
  number: number;
}

export type Types = 'Insert' | 'Update' | 'Search' | 'Lookup' | 'Count';

export interface RequestPayload {
  type: Types;
  data?: MTGItem;
  query?: string | RequestQuery;
  countColumn?: CountColumn;
}

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

export interface CardFaces {
  object: string;
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  flavor_text?: string;
  colors: string[];
  power: string;
  toughness: string;
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: ImageUris;
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
  finishes: string[];
  set_search_uri: string;
  legalities: Legalities;
  illustration_id: string;
  games: string[];
  oracle_id: string;
  oracle_text?: string;
  image_status: string;
  reserved: boolean;
  mtgo_id: number;
  mana_cost: string;
  prints_search_uri: string;
  colors?: string[];
  name: string;
  cardmarket_id: number;
  related_uris: RelatedUris;
  card_back_id: string;
  oversized: boolean;
  scryfall_set_uri: string;
  color_identity: string[];
  type_line: string;
  purchase_uris: PurchaseUris;
  object: string;
  scryfall_uri: string;
  set_name: string;
  edhrec_rank: number;
  multiverse_ids: number[];
  set: string;
  foil: boolean;
  released_at: string;
  rulings_uri: string;
  toughness?: string;
  image_uris?: ImageUris;
  card_faces?: CardFaces[];
  promo: boolean;
  booster: boolean;
  story_spotlight: boolean;
  set_type: string;
  variation: boolean;
  keywords: string[];
  artist_ids: string[];
  flavor_text?: string;
  prices: Prices;
  highres_image: boolean;
  lang: string;
  reprint: boolean;
}

export interface ScryfallSearch {
  has_more: boolean;
  object: string;
  data: ScryfallCardData[];
  total_cards: number;
}

export interface ScryfallError {
  object: string;
  code: string;
  status: number;
  warnings?: string[];
  details: string;
}

export interface ScryfallCardSelection {
  [key: string]: MTGItem;
}
