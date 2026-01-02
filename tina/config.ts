import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
//const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch: "main",
  clientId: "958e95b9-62bd-4811-8b53-8f4d617c2341",
  token: "e9564fb95515f055a3c407c6d92aba5c4379f38e",

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },

  media: {
    tina: {
      publicFolder: "_site",
      mediaRoot: "assets/images",
    },
  },

  schema: {
    collections: [
      // ----------------------------
      // POSTS
      // ----------------------------
      {
        name: "post",
        label: "Posts",
        path: "_posts",

        ui: {
          filename: {
            slugify: (values) => {
              const postDate = values.time
                ? new Date(values.time)
                : new Date();

              return `${postDate.toISOString().split("T")[0]}-${(values.episode || "")
                .toLowerCase()
                .replace(/ /g, "-")}`;
            },
          },
        },

        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "layout", label: "Layout", required: true },
          { type: "string", name: "episode", label: "Episode", required: true },
          { type: "string", name: "file", label: "Audio URL", required: true },
          { type: "datetime", name: "time", label: "Date", required: true },
          { type: "image", name: "cover", label: "Thumbnail", required: true },
          { type: "string", name: "description", label: "Description", required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },

      // ----------------------------
      // AUDIOBOOK CHAPTERS (SERIES → CHAPTERS)
      // ----------------------------
      {
        name: "audiobook",
        label: "Audiobooks",
        path: "_audiobooks",
        format: "md",

        defaultItem: {
          layout: "audiobook",
        },

        ui: {
          // 🔑 REQUIRED for folders-as-series
          allowedContentTypes: ["folder", "file"],

          filename: {
            slugify: (values) => {
              const chapter = String(values.chapter || "").padStart(2, "0");
              return `chapter-${chapter}`;
            },
          },
        },

        fields: [
          {
            type: "string",
            name: "title",
            label: "Chapter Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: ["audiobook"],
            required: true,
          },
          {
            type: "string",
            name: "series",
            label: "Series Title",
            required: true,
          },
          {
            type: "number",
            name: "chapter",
            label: "Chapter Number",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "series_slug",
            label: "Series Slug",
          },
          {
            type: "image",
            name: "cover",
            label: "Cover Image",
          },
          {
            type: "string",
            name: "audio_file",
            label: "Audio URL",
            required: true,
          },
          {
            type: "datetime",
            name: "time",
            label: "Publish Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: "769d0131152c0813fb2146f35d44e092ad2d1ab5",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});