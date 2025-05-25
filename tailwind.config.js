/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        marine: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DBFF',
          300: '#8AC2FF',
          400: '#5CA6F5',
          500: '#3282B8',
          600: '#1F6096',
          700: '#0A3D62',
          800: '#072A45',
          900: '#051C2E',
        },
        accent: {
          50: '#FEF9E7',
          100: '#FCF3CF',
          200: '#F9E79F',
          300: '#F7DC6F',
          400: '#F4D03F',
          500: '#F39C12',
          600: '#D68910',
          700: '#B9770E',
          800: '#9C640C',
          900: '#7E5109',
        },
        status: {
          moving: '#16A34A',
          anchored: '#EA580C',
          moored: '#2563EB',
          underway: '#8B5CF6',
          aground: '#DC2626',
          unknown: '#71717A'
        }
      }
    },
  },
  plugins: [],
};