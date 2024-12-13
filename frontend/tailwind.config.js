/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        "sh-1": "#303236",
        "sh-2": "#4B555C",
        "sh-3": "#657C82",
        "sh-4": "#83A5A4",
        "sh-5": "#A9CEC2",
      },
    },
  },
  plugins: [],
};
