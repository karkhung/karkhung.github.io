import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '13b494feaa2388f3d9b172ab60d24a22504d7cef', queries,  });
export default client;
  