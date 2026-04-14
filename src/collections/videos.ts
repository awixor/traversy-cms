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
      name: "videoId",
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
    {
      name: "thumbnail",
      type: "text",
    },
    {
      name: "duration",
      type: "text",
    },
    // Classification Fields
    {
      name: "format",
      type: "select",
      options: [
        { label: "Crash Course", value: "crash_course" },
        { label: "Project Build", value: "project_build" },
        { label: "Quick Tip", value: "quick_tip" },
        { label: "Live Stream", value: "live_stream" },
        { label: "Podcast / Interview", value: "podcast" },
        { label: "Course", value: "course" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "skillLevel",
      type: "select",
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
      ],
    },
    // The "Enhanced" part: Linking tags
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "topics",
      type: "relationship",
      relationTo: "topics",
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
