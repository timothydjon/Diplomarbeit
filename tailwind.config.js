/** @type {import('tailwindcss').Config} */
const generateSpacings = (interval = 5, max = 300) => {
  const array = {};
  for (let x = 0; x <= max; x += interval) {
    array[x] = `${x / 10}rem`;
  }
  return array;
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    spacings: {
      ...generateSpacings(1, 20),
      ...generateSpacings(),
    },
    screens: {
      minxl: { min: "1601px" },
      xl: { max: "1600px" },
      lg: { max: "1024px" },
      md: { max: "860px" },
      sm: { max: "500px" },
    },
    colors: {
      grey: {
        light: "#D9D9D9",
        medium: "#6A6775",
        dark: "#434547",
      },
      green: "#055935",
      brown: "#806C6C",
      white: "#ffffff",
      purple: "#9974E7",
    },
  },
  plugins: [],
};
