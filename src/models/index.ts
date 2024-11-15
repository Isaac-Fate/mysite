import type { BlogPostData } from "./blog-post-data";
import { BlogPostDataSchema } from "./blog-post-data";

import type { BlogPostMetadata } from "./blog-post-metadata";
import { BlogPostMetadataSchema } from "./blog-post-metadata";

import type { NavigationLinkConfig } from "./navigation-link-config";
import { NavigationLinkConfigSchema } from "./navigation-link-config";

export type { BlogPostData, BlogPostMetadata, NavigationLinkConfig };

export {
  BlogPostDataSchema,
  BlogPostMetadataSchema,
  NavigationLinkConfigSchema,
};
