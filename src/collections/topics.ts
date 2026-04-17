import { CollectionConfig } from "payload";

export const Topics: CollectionConfig = {
  slug: "topics",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 999,
      admin: {
        description: "Lower number = higher in sidebar (e.g. Frontend=1, Backend=2).",
        position: "sidebar",
      },
    },
  ],
};
