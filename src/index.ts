/* eslint-disable no-restricted-globals */
import { handleRequest } from './handler';

addEventListener('fetch', (event: FetchEvent) => {
  console.log({ event });
  event.passThroughOnException();
  event.respondWith(handleRequest(event.request));
});
