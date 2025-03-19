/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans Thai", "sans-serif"],
      },
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
          100: "#E0D0FF",
          200: "#C5A3FF",
          300: "#A577FF",
          400: "#8A4BFF",
          500: "#B038FF",
          600: "#9A2CC7",
          700: "#7A229F",
          800: "#5A1777",
          900: "#3A0E4F",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: {
          100: "#CCFBF1", // เขียวอ่อนมาก (Pastel)
          200: "#99F6E4", // เขียวอ่อน
          300: "#5EEAD4", // เขียวสดใส
          400: "#2DD4BF", // เขียวกลาง
          500: "rgb(20 184 166)", // สีหลัก Success (Primary Green)
          600: "#0F9F8F", // เขียวเข้มขึ้น
          700: "#0D8476", // เขียวเข้ม
          800: "#0B695D", // เขียวเข้มมาก
          900: "#094E44", // เขียวเข้มสุด
        },
        muted: {
          100: "#F4F4F5", // เทาอ่อนสุด (เกือบขาว)
          200: "#E4E4E7", // เทาอ่อน
          300: "#D4D4D8", // เทากลาง
          400: "#A1A1AA", // เทากลางเข้ม
          500: "#71717A", // สีหลัก Muted (เทาเข้มกลาง)
          600: "#5E5E66", // เทาเข้ม
          700: "#4B4B52", // เทาเข้มมาก
          800: "#38383D", // เทาดำ
          900: "#252529", // เทาดำสุด
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
