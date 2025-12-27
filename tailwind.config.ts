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
        primary: '#FF7000',
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

