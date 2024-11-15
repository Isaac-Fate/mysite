import { NavigationLinkConfigSchema } from "@/models";

import { z } from "zod";

const ProjectConfigSchema = z.object({
  headerHeight: z.number().or(z.string()),
  navigationLinkConfigs: z.array(NavigationLinkConfigSchema),
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
    // {
    //   title: "Playground",
    //   href: "/playground",
    // },
  ],
});
