// collections/Tags.ts
import { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: { useAsTitle: "name" }, // Shows the name in the admin UI
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Language", value: "language" },
        { label: "Framework", value: "framework" },
        { label: "Tool", value: "tool" },
      ],
    },
  ],
};
