/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        overlay: "rgba(0, 0, 0, 0.2)",
        "sh-1": "#303236",
        "sh-2": "#4B555C",
        "sh-3": "#657C82",
        "sh-4": "#83A5A4",
        "sh-5": "#A9CEC2",
        monokai: "#101010",
        "model-green": "#22C55E",
        "controller-red": "#EF4444",
        "route-yellow": "#EAB308",
        "middleware-purple": "#A855F7",
        "events-orange": "#F97316",
        "settings-teal": "#14B8A6",
      },
      boxShadow: {
        custom: "0px 0px 10px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(135 135 135) rgb(247 247 247)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(247 247 247)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(135 135 135)",
            borderRadius: "4px",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    },
  ],
};
