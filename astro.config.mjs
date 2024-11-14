// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// @ts-ignore
import { imageService } from "@unpic/astro/service";

import mdx from "@astrojs/mdx";

import astroExpressiveCode from "astro-expressive-code";

// Pagefind integration
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  image: {
    service: imageService({
      // This can usually be auto-detected
      // fallbackService: "netlify",

      placeholder: "blurhash",

      // This is the default
      layout: "constrained",
    }),
  },
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

    pagefind(),
  ],

  // output: "server",
  // adapter: netlify({
  //   edgeMiddleware: true,
  // }),
});
