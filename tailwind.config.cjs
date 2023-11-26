import defaultTheme from "tailwindcss/defaultTheme";

/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   fontWeight: false,
  // },
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        header: "176px 1fr auto md:1fr auto 1fr",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        esmeralda: ["EsmeraldaPro", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        bgColor: "#f4f4f4",
        primaryLightShade: "#FFFCF1",
        primaryLightBorder: "#d9ceb2",
        camel: "#f5e4bc",
        primaryGold: {
          50: "hsl(49, 67%, 95%)",
          100: "hsl(51, 67%, 88%)",
          200: "hsl(48, 69%, 77%)",
          300: "hsl(46, 70%, 64%)",
          400: "hsl(44, 68%, 55%)",
          500: "hsl(41, 66%, 47%)",
          600: "hsl(36, 68%, 40%)",
          700: "hsl(31, 65%, 33%)",
          800: "hsl(28, 58%, 29%)",
          900: "hsl(24, 51%, 26%)",
          950: "hsl(21, 58%, 14%)",
          DEFAULT: "hsl(44, 68%, 55%)",
        },

        primaryDark: {
          light: "hsl(53, 8%, 22%)",
          DEFAULT: "hsl(50, 8%, 15%)",
          dark: "hsl(60, 10%, 10%)",
        },
        primaryRed: {
          50: "hsl(0, 73%, 97%)",
          100: "hsl(0, 73%, 94%)",
          200: "hsl(0, 75%, 89%)",
          300: "hsl(0, 70%, 82%)",
          400: "hsl(0, 69%, 71%)",
          500: "hsl(0, 64%, 60%)",
          600: "hsl(0, 55%, 51%)",
          700: "hsl(0, 56%, 39%)",
          800: "hsl(0, 53%, 35%)",
          900: "hsl(0, 47%, 31%)",
          950: "hsl(0, 58%, 15%)",
          DEFAULT: "hsl(0, 56%, 39%)",
        },
        primaryLight: {
          50: "hsl(44, 56%, 95%)",
          100: "hsl(45, 57%, 92%)",
          200: "hsl(43, 53%, 83%)",
          300: "hsl(41, 55%, 72%)",
          400: "hsl(38, 54%, 61%)",
          500: "hsl(35, 53%, 53%)",
          600: "hsl(31, 50%, 48%)",
          700: "hsl(28, 50%, 40%)",
          800: "hsl(26, 44%, 34%)",
          900: "hsl(26, 41%, 28%)",
          950: "hsl(25, 46%, 15%)",
          DEFAULT: "hsl(44, 56%, 95%)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "square-pattern": "url(/bright-squares.png)",
        "gradient-radial":
          "radial-gradient(98.71% 98.71% at 52.79% 99.41%, #FFC5C0 0%, rgba(255, 241, 192, 0) 100%)",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // require("./fontVariationSettingsPlugin"),
  ],
};
