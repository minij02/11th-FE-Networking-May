import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 다크모드 class 기반
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        "gray-60": "#292E2E",
        "gray-10": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
