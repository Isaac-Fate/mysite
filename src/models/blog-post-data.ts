import { z } from "zod";

export const BlogPostDataSchema = z.object({
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  description: z.string(),

  /**
   * Cover image.
   */
  cover: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

export type BlogPostData = z.infer<typeof BlogPostDataSchema>;
