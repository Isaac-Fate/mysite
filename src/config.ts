import { z } from "zod";
import { NavigationLinkConfigSchema } from "@/models";

const ProjectConfigSchema = z.object({
  headerHeight: z.number().or(z.string()),
  navigationLinkConfigs: z.array(NavigationLinkConfigSchema),
  search: z.object({
    searchInputHeight: z.number().or(z.string()),
  }),
});

export const config = ProjectConfigSchema.parse({
  headerHeight: "4rem",
  navigationLinkConfigs: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog/1",
      isActive: (href: string | undefined, pathname: string) => {
        if (!href) return false;

        if (pathname.startsWith(href)) {
          return true;
        }

        if (pathname.startsWith("/posts")) {
          return true;
        }

        return false;
      },
    },
  ],
  search: {
    searchInputHeight: "3rem",
  },
});
