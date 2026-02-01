import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
        rubik: ['Rubik', ...fontFamily.sans],
      },
      colors: {

          // Dashboard only colors
          'dashboard-streak': '#F44336', // merah streak (material red 500)
          'dashboard-gold': '#FFD600', // emas (material yellow A700)
          // Dashboard/Lesson gradients
          'lesson-lv1-from': '#FFD600', // amber-300
          'lesson-lv1-to': '#FF7000',   // orange-600
          'lesson-lv2-from': '#5EEAD4', // teal-300
          'lesson-lv2-to': '#0891B2',   // cyan-600
          'lesson-lv3-from': '#C4B5FD', // violet-300
          'lesson-lv3-to': '#7C3AED',   // purple-700
         // LessonCircleButton status colors
          'lesson-green': '#22c55e', // green-500
          'lesson-green-dark': '#15803d', // green-700
          'lesson-gray': '#9ca3af', // gray-400
          'lesson-gray-dark': '#991b1b', // red-800 (for shadow) 
            // Record/voice button colors
          'record-red': '#ef4444', // red-500
          'record-red-dark': '#b91c1c', // red-700
        primary: '#FF7000',
        'primary-dark': '#cc5a00', // orange lebih gelap untuk hover tombol
        secondary: '#333',
        thirdary: '#FFAC4A',
        background: '#F6F6F6',
        neutral: '#9E9E9E',
        error: '#c33',
        dark: '#1a1a1a',
        border: '#e0e0e0',
        inputBg: '#fafafa',
        disabled: '#f5f5f5',
        errorBg: '#fee',
        errorLight: '#fff8f5',
        checkboxBorder: '#ccc',
        // Custom gray for lessons
        lessongray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937', // gunakan ini untuk text dan hover agar konsisten
          900: '#111827',
        },
        // Rank colors
        rank1: {
          DEFAULT: '#ffe082', // emas
          border: '#e6a800',
        },
        rank2: {
          DEFAULT: '#e0e0e0', // perak
          border: '#b0b0b0',
        },
        rank3: {
          DEFAULT: '#ffb47b', // perunggu
          border: '#c97a3d',
        },
        rank4: {
          DEFAULT: '#bdbdbd', // abu-abu
          border: '#757575',
        },
      },
      fontSize: {
        body: 'clamp(14px, 1.2vw, 18px)',
        heading: 'clamp(24px, 4vw, 48px)',
        title: 'clamp(28px,5em,36px)',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config

