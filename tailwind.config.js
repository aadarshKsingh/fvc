/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", 
        "./pages/**/*.{js,ts,jsx,tsx}", 
        "./components/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        fontSize: {
          "10xl": "9rem", // Bigger than 8xl
          "12xl": "12rem" // Even larger
        },
      },
    },
    plugins: [],
  };
  