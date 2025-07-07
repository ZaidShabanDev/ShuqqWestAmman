/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Primary font for both Arabic and English
        primary: [
          "Inter",
          "Noto Sans Arabic",
          "system-ui",
          "sans-serif",
        ],
        // Secondary font for headings
        secondary: [
          "Poppins",
          "Noto Sans Arabic",
          "system-ui",
          "sans-serif",
        ],
        // Arabic-specific font
        arabic: [
          "Noto Sans Arabic",
          "Tajawal",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        // Primary colors (black and white base)
        primary: {
          50: "#f8f9fa",
          100: "#f1f3f4",
          200: "#e8eaed",
          300: "#dadce0",
          400: "#bdc1c6",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#202124",
          950: "#0d0d0d",
        },
        // Secondary colors (cool blues)
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Accent colors (teal)
        accent: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        // Custom grays
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },
      fontSize: {
        // Custom font sizes for Arabic/English
        xs: [
          "0.75rem",
          { lineHeight: "1.5", letterSpacing: "0.025em" },
        ],
        sm: [
          "0.875rem",
          { lineHeight: "1.6", letterSpacing: "0.025em" },
        ],
        base: [
          "1rem",
          { lineHeight: "1.7", letterSpacing: "0.025em" },
        ],
        lg: [
          "1.125rem",
          { lineHeight: "1.7", letterSpacing: "0.025em" },
        ],
        xl: [
          "1.25rem",
          { lineHeight: "1.7", letterSpacing: "0.025em" },
        ],
        "2xl": [
          "1.5rem",
          { lineHeight: "1.6", letterSpacing: "0.025em" },
        ],
        "3xl": [
          "1.875rem",
          { lineHeight: "1.5", letterSpacing: "0.025em" },
        ],
        "4xl": [
          "2.25rem",
          { lineHeight: "1.4", letterSpacing: "0.025em" },
        ],
        "5xl": [
          "3rem",
          { lineHeight: "1.3", letterSpacing: "0.025em" },
        ],
        "6xl": [
          "3.75rem",
          { lineHeight: "1.2", letterSpacing: "0.025em" },
        ],
        "7xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "0.025em" },
        ],
        "8xl": [
          "6rem",
          { lineHeight: "1", letterSpacing: "0.025em" },
        ],
        "9xl": [
          "8rem",
          { lineHeight: "1", letterSpacing: "0.025em" },
        ],
      },
      spacing: {
        // Custom spacing for RTL layouts
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    // RTL support
    function ({ addUtilities }) {
      addUtilities({
        ".rtl": {
          direction: "rtl",
        },
        ".ltr": {
          direction: "ltr",
        },
      });
    },
  ],
};
