/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#FFBE0B",
        "main-orange": "#FB5607",
        "main-pink": "#FF006E",
        "main-purple": "#8338EC",
        "main-blue": "#3A86FF",
        "main-darknavy": "#001524",
        "main-test1": "#15616D",
      },
    },
  },
  plugins: [],
};
