import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'e9564fb95515f055a3c407c6d92aba5c4379f38e', queries,  });
export default client;
  