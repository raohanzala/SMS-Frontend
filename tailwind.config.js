/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2C4FD8',
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      animation: {
        spin: "spin 1s linear infinite",
        'fade-in': 'fadeIn 1s linear infinite',
        'scale-up': 'scaleUp 1s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), // Add this plugin for scrollbar-hide
    // require('@tailwindcss/forms'), // Optional: Useful for styling forms
  ],
};
