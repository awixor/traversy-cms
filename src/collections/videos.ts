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
    {
      name: "topic",
      type: "select",
      options: [
        { label: "Frontend Development", value: "frontend" },
        { label: "Backend Development", value: "backend" },
        { label: "Full Stack", value: "full_stack" },
        { label: "Mobile Development", value: "mobile" },
        { label: "DevOps & Cloud", value: "devops" },
        { label: "Database", value: "database" },
        { label: "Career & General", value: "career" },
        { label: "Other", value: "other" },
      ],
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
