// collections/Videos.ts
import { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: { useAsTitle: "title" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      unique: true, // Prevents duplicate indexing
    },
    {
      name: "description",
      type: "text",
      //   type: "richText", // Payload v3 uses Lexical (very powerful editor)
    },
    {
      name: "publishedAt",
      type: "date",
    },
    // The "Enhanced" part: Linking tags
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    // Adding custom blocks for code snippets/resources
    {
      name: "resources",
      type: "blocks",
      blocks: [
        {
          slug: "codeSnippet",
          fields: [
            { name: "language", type: "text" },
            { name: "code", type: "code" },
          ],
        },
        {
          slug: "externalLink",
          fields: [
            { name: "label", type: "text" },
            { name: "url", type: "text" },
          ],
        },
      ],
    },
  ],
};
