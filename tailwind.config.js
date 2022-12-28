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
  },
  plugins: [],
};
