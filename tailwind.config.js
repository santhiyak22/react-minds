/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}", // <-- your app directory
    "./components/**/*.{ts,tsx,js,jsx}", // any components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
