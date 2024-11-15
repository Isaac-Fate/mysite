// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Schema for the blog post data
import { BlogPostDataSchema } from "@/models";

// Define a `type` and `schema` for each collection
const blogPostCollection = defineCollection({
  type: "content",

  schema: BlogPostDataSchema,
});

// Export a single `collections` object to register collection(s)
export const collections = {
  posts: blogPostCollection,
};
