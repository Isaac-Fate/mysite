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

// Latex support in Markdown/MDX
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  // image: {
  //   service: imageService({
  //     // This can usually be auto-detected
  //     // fallbackService: "netlify",

  //     placeholder: "blurhash",

  //     // This is the default
  //     layout: "constrained",
  //   }),
  // },
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [[remarkMath, {}]],
    rehypePlugins: [
      [
        // The Katex plugin needs to be put before the Expressive Code plugin
        // Katex options: https://katex.org/docs/options.html
        // Set output to "mathml" to only get the mathml span and not the html span
        rehypeKatex,
        {
          output: "mathml",
          leqno: true,
          macros: {
            "\\R": "\\mathbb{R}",
            "\\C": "\\mathbb{C}",
            "\\F": "\\mathbb{F}",
            "\\N": "\\mathbb{N}",
            "\\Z": "\\mathbb{Z}",
            "\\Q": "\\mathbb{Q}",

            "\\floor": "\\left\\lfloor #1 \\right\\rfloor",
            "\\ceil": "\\left\\lceil #1 \\right\\rceil",

            "\\If": "\\textcolor{#c586c0}{\\large \\text{if}} \\;",
            "\\EndIf": "\\textcolor{#c586c0}{\\large \\text{end if}} \\;",
            "\\Then": "\\textcolor{#c586c0}{\\; \\large \\text{then}} \\;",
            "\\ElseIf": "\\textcolor{#c586c0}{\\large \\text{else if}} \\;",
            "\\Else": "\\textcolor{#c586c0}{\\large \\text{else}} \\;",

            "\\Do": "\\textcolor{#c586c0}{\\; \\large \\text{do}} \\;",

            "\\For": "\\textcolor{#c586c0}{\\large \\text{for}} \\;",
            "\\EndFor": "\\textcolor{#c586c0}{\\large \\text{end for}} \\;",

            "\\While": "\\textcolor{#c586c0}{\\large \\text{while}} \\;",
            "\\EndWhile": "\\textcolor{#c586c0}{\\large \\text{end while}} \\;",

            "\\To": "\\textcolor{#5598d0}{\\; \\large \\text{to}} \\;",
            "\\Downto": "\\textcolor{#5598d0}{\\; \\large \\text{downto}} \\;",
            "\\In": "\\textcolor{#5598d0}{\\; \\large \\text{in}} \\;",
            "\\And": "\\textcolor{#5598d0}{\\; \\large \\text{and}} \\;",
            "\\Or": "\\textcolor{#5598d0}{\\; \\large \\text{or}} \\;",

            "\\Return": "\\textcolor{#c586c0}{\\large \\text{return}} \\;",
          },
        },
      ],
    ],
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

  output: "static",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  redirects: {
    "/blog": "/blog/1",
  },
});
