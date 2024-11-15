import { z } from "zod";
import { BlogPostDataSchema } from "./blog-post-data";

export const BlogPostMetadataSchema = BlogPostDataSchema.extend({
  slug: z.string(),
});

export type BlogPostMetadata = z.infer<typeof BlogPostMetadataSchema>;
