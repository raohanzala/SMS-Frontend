/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#1E59FF',
          dark: '#0029CC',
          darker: '#001A99',
        },
        // Accent Colors
        accent: {
          purple: '#4F45A4',
          purpleLight: '#6B5FCF',
          purpleDark: '#3D3480',
          purpleDarker: '#2D2560',
          teal: '#00D4AA',
          tealDark: '#00B8A0',
          tealDarker: '#00A085',
          cyan: '#00B8E6',
          cyanDark: '#0099C4',
        },
        // Background Colors
        bg: {
          main: '#FFFFFF',
          secondary: '#F8F9FA',
          tertiary: '#F0F2F5',
        },
        // Text Colors
        text: {
          primary: '#0A2540',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          white: '#FFFFFF',
        },
        // Status Colors
        status: {
          success: '#00D4AA',
          error: '#EF4444',
          errorDark: '#DC2626',
          warning: '#F59E0B',
          warningDark: '#D97706',
          info: '#00B8E6',
        },
        // Sidebar Colors
        sidebar: {
          DEFAULT: '#000235',
          secondary: '#1A3A5C',
          border: '#1A3A5C',
        },
        // Border Colors
        border: {
          DEFAULT: '#E5E7EB',
          light: '#D1D5DB',
        },
        // Dark Mode Colors (for future use)
        dark: {
          DEFAULT: '#0A2540',
          secondary: '#1A3A5C',
          lighter: '#2A4A6C',
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
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
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.05)',
        'modal': 'rgba(0, 0, 0, 0.15)',
        'primary': 'rgba(0, 61, 255, 0.3)',
      },
      backgroundColor: {
        'modal-overlay': 'rgba(10, 37, 64, 0.7)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
