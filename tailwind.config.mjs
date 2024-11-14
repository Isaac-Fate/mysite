const { addDynamicIconSelectors } = require("@iconify/tailwind");

import {
  importDirectorySync,
  cleanupSVG,
  runSVGO,
  isEmptyColor,
} from "@iconify/tools";

const customIconSet = importDirectorySync("public/icons", { prefix: "icon" });

customIconSet.forEachSync((name, type) => {
  // Return if the file is not an icon
  if (type !== "icon") {
    return;
  }

  // Create an SVG icon from the file
  const svg = customIconSet.toSVG(name);

  if (!svg) {
    customIconSet.remove(name);
    return;
  }

  try {
    cleanupSVG(svg);
    runSVGO(svg);
  } catch (err) {
    console.error(`Error parsing ${name}:`, err);
    customIconSet.remove(name);
  }

  // Add to the icon set
  customIconSet.fromSVG(name, svg);

  console.log(`added icon: ${name}`);
});

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        code: {
          plain: "#d4d4d4",
          class: "#4ec9b0",
          function: "#DCDCAA",
          string: "#CE9178",
          keyword: {
            declaration: "#5598d0",
            control: "#c586c0",
          },
          variable: "#9CDCFE",
          constant: "#4fc1ff",
          comment: "#699755",
          bracket: {
            1: "#ffd602",
            2: "#da70d6",
            3: "#169fff",
          },
        },
      },

      backgroundColor: {
        panel: "rgba(24, 24, 24, 1.0)",
        overlay: "rgba(39, 39, 42, 0.8)",
      },

      fontFamily: {
        "fira-code": ['"Fira Code"'],
      },

      screens: {
        "card-landscape": "1140px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),

    // Typography plugin
    require("@tailwindcss/typography"),

    // Rombo tailwind motion
    require("tailwindcss-motion"),

    // Iconify plugin
    addDynamicIconSelectors({
      iconSets: {
        my: customIconSet.export(),
      },
    }),
  ],
};
