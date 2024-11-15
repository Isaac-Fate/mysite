import { z } from "zod";

export const NavigationLinkConfigSchema = z.object({
  title: z.string(),
  href: z.string().optional(),
  isActive: z
    .boolean()
    .or(
      z.function().args(z.string().optional(), z.string()).returns(z.boolean()),
    )
    .optional(),
});

export type NavigationLinkConfig = z.infer<typeof NavigationLinkConfigSchema>;
