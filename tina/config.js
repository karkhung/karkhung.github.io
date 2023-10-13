import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: 'b029955e-b004-4164-94dc-6e9f09fb7387', // Get this from tina.io
  token: '13b494feaa2388f3d9b172ab60d24a22504d7cef', // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "./",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { 
            type: "string",
            name: "episode",
            label: "Episode",
          },
          {
            type: "string",
            name: "file",
            label: "Audio URL",
          },
           {
            type: "image",
            name: "cover",
            label: "Thumbnail",
          },

          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: '<Your Search Token>',
      stopwordLanguages: ['bo']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  //.. Other config
});
