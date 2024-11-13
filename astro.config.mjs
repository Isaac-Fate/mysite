// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

import mdx from "@astrojs/mdx";

import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),

    // astroExpressiveCode() must be placed before mdx()
    astroExpressiveCode({
      styleOverrides: {},
    }),

    mdx(),
  ],

  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
});
