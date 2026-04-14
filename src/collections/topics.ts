import { CollectionConfig } from "payload";

export const Topics: CollectionConfig = {
  slug: "topics",
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
