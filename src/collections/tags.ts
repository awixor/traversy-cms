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
        { label: "Framework & Library", value: "framework" },
        { label: "Database", value: "database" },
        { label: "Tool", value: "tool" },
        { label: "Platform & Cloud", value: "platform" },
        { label: "Service provider", value: "service" },
        { label: "Concept & Architecture", value: "concept" },
      ],
    },
  ],
};
