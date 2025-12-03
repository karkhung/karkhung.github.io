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
        publicFolder: "./",
        mediaRoot: "/assets/images/",
     },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        ui: {
        filename: {
          slugify: values => {
            const postDate = values.time ? new Date(values.time) : new Date();
            return `${postDate.toISOString().split("T")[0]}-${"episode"}-${(values.episode || "")
              .toLowerCase()
              .replace(/ /g, "-")}`.replace(/[^\w\.\/-\s]/gi, "");
          }
        }
      },

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
            name: "layout",
            label: "Layout",
            required: true,
          },
          { 
            type: "string",
            name: "episode",
            label: "Episode",
            required: true,
          },
          {
            type: "string",
            name: "file",
            label: "Audio URL",
            required: true,
          },
          {
            label: "Date",
            name: "time",
            type: "datetime",
            required: true,
          },

           {
            type: "image",
            name: "cover",
            label: "Thumbnail",
            required: true,
          },

          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "audiobook",
        lable: "audiobook",
        path: "_audiobooks",
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
            name: "series",
            label: "Series",
            required: true,
          },
          {
            type: "number",
            name: "chapter",
            label: "Chapter",
            required: true,
          },
           {
            type: "string",
            name: "audio_file",
            label: "Audio URL",
            required: true,
          },
         {
            type: "image",
            name: "cover",
            label: "Cover",
            required: true,
          },
           {
            label: "Date",
            name: "time",
            type: "datetime",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
          },
        ],
        ui: {
          filename: {
            slugify: values => {
              const postDate = values.time ? new Date(values.time) : new Date();
              return `${postDate.toISOString().split("T")[0]}-chapter-${String(values.chapter || "").padStart(2, '0')}`.toLowerCase()
                .replace(/[^\w\.\/-\s]/gi, "");
            }
          }
        }
      }
    ],
    
  },

  search: {
    tina: {
      indexerToken: 'bcd44eb9832f26ab9d3d17b1c39e7c55159ccfa8',
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  //.. Other config
});
