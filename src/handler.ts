import {
  addMTGItem,
  queryMTGAggregateCount,
  queryMTGItems,
  searchMTGItems,
  updateMTGItem,
} from './hasura';
import { searchCard } from './scryfall';
import { version } from '../package.json';

import { CountColumn, RequestPayload, MTGItem } from './typings.d';

// default responses
const responseInit = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};
const badReqBody = {
  status: 400,
  statusText: 'Bad Request',
  ...responseInit,
};
const errReqBody = {
  status: 500,
  statusText: 'Internal Error',
  ...responseInit,
};
const noAuthReqBody = {
  status: 401,
  statusText: 'Unauthorized',
  ...responseInit,
};

const missingData = (data: MTGItem | undefined): boolean => {
  if (data) {
    const typedData = data as MTGItem;
    const cleanData = Object.keys(typedData)
      .reduce(
        (acc, key) => [...acc, { key, value: typedData[key] }],
        [] as { key: string; value: string }[]
      )
      .filter(item => item.key !== 'id');
    const missing = Object.values(cleanData).some(value => value === undefined);

    return missing;
  }

  return true;
};

/**
 * Helper method to determine which type/category to use.
 * @function
 * @async
 *
 * @param payload request payload
 * @returns {Promise<Response>} response
 */
const handleAction = async (payload: RequestPayload): Promise<Response> => {
  try {
    // determine which type and method to use
    switch (true) {
      case payload.type === 'Insert': {
        const insertData = payload.data as MTGItem;
        const saved = await addMTGItem(insertData);

        return new Response(
          JSON.stringify({
            saved,
            location: payload.type,
            version,
          }),
          responseInit
        );
      }
      case payload.type === 'Update': {
        const updateData = payload.data as MTGItem;
        const updated = await updateMTGItem(
          updateData.id as string,
          updateData
        );

        return new Response(
          JSON.stringify({
            updated,
            location: payload.type,
            version,
          }),
          responseInit
        );
      }
      case payload.type === 'Search': {
        const searchPattern = payload.query as string;
        const searchItems = await searchMTGItems(searchPattern);

        return new Response(
          JSON.stringify({
            items: searchItems,
            version,
          }),
          responseInit
        );
      }
      case payload.type === 'Lookup': {
        const searchPattern = payload.query as RequestQuery;
        const searchItems = await searchCard(searchPattern);

        return new Response(
          JSON.stringify({
            items: searchItems,
            version,
          }),
          responseInit
        );
      }
      case payload.type === 'Count': {
        const queryResults = await queryMTGAggregateCount(
          payload.countColumn as CountColumn
        );

        return new Response(
          JSON.stringify({
            count: queryResults,
            version,
          }),
          responseInit
        );
      }
      default: {
        const queryItems = await queryMTGItems();

        return new Response(
          JSON.stringify({
            items: queryItems,
            version,
          }),
          responseInit
        );
      }
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error, location: payload.type, version }),
      errReqBody
    );
  }
};

const handlePost = async (request: Request): Promise<Response> => {
  const payload: RequestPayload = await request.json();

  // check for required fields
  switch (true) {
    case !payload.type:
      return new Response(
        JSON.stringify({ error: "Missing 'type' parameter.", version }),
        badReqBody
      );
    case payload.type === 'Insert' && missingData(payload.data):
      return new Response(
        JSON.stringify({
          error: "Missing Insert 'data' parameter.",
          version,
        }),
        badReqBody
      );
    case payload.type === 'Update' && missingData(payload.data):
      return new Response(
        JSON.stringify({
          error: "Missing Update 'data' parameter.",
          version,
        }),
        badReqBody
      );
    case payload.type === 'Search' && !payload.query:
      return new Response(
        JSON.stringify({
          error: "Missing Search 'query' parameter.",
          version,
        }),
        badReqBody
      );
    case payload.type === 'Lookup' && !payload.query:
      return new Response(
        JSON.stringify({
          error: "Missing Lookup 'query' parameter.",
          version,
        }),
        badReqBody
      );
    case payload.type === 'Count' && !payload.countColumn:
      return new Response(
        JSON.stringify({
          error: "Missing 'countColumn' parameter.",
          version,
        }),
        badReqBody
      );
    default: {
      console.log('handleRequest', { payload });

      return handleAction(payload);
    }
  }
};

/**
 * Handler method for all requests.
 * @function
 * @async
 *
 * @param {Request} request request object
 * @returns {Promise<Response>} response object
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const contentType = request.headers.get('content-type');
  const key = request.headers.get('key');
  const isPost = request.method === 'POST';
  const isGet = request.method === 'GET';
  const isJson = contentType?.includes('application/json');

  switch (true) {
    case !contentType:
      return new Response(
        JSON.stringify({
          error: "Please provide 'content-type' header.",
          version,
        }),
        badReqBody
      );
    case !isGet && !isPost:
      return new Response(JSON.stringify({ version }), {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    case !isJson:
      return new Response(JSON.stringify({ version }), {
        status: 415,
        statusText: 'Unsupported Media Type',
      });
    case !key:
      return new Response(
        JSON.stringify({ error: "Missing 'key' header.", version }),
        noAuthReqBody
      );
    case key !== AUTH_KEY:
      return new Response(
        JSON.stringify({
          error: "You're not authorized to access this API.",
          version,
        }),
        noAuthReqBody
      );
    case isPost:
      return handlePost(request);
    default:
      const queryItems = await queryMTGItems();

      return new Response(
        JSON.stringify({
          items: queryItems,
          version,
        }),
        responseInit
      );
  }
};
