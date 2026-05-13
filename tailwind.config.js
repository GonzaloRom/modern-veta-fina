/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F5EDD9',
          300: '#EDE0C4',
          400: '#E2CEAA',
          500: '#D4B896',
          600: '#C09B75',
          700: '#A07D58',
          800: '#7A5E3E',
          900: '#543F28',
        },
        warm: {
          50: '#FAF8F5',
          100: '#F2EDE5',
          200: '#E4D8C8',
          300: '#CEB89A',
          400: '#B5936C',
          500: '#9A7248',
          600: '#7D5A34',
          700: '#614426',
          800: '#44301A',
          900: '#2D1F0F',
          950: '#1A1108',
        },
        gold: {
          50: '#FEFCF0',
          100: '#FDF7D4',
          200: '#FBECA4',
          300: '#F7D96B',
          400: '#F2C441',
          500: '#E8AA1A',
          600: '#C98B0F',
          700: '#9E6A0C',
          800: '#734D0B',
          900: '#4D330A',
        },
        peach: {
          50: '#FFF8F3',
          100: '#FFEDE0',
          200: '#FFD8B8',
          300: '#FFBC8A',
          400: '#FF9A5C',
          500: '#F5793A',
          600: '#D95A20',
          700: '#AD4314',
          800: '#80300D',
          900: '#5C2209',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        warm: '0 4px 24px rgba(160, 100, 40, 0.12)',
        'warm-lg': '0 8px 40px rgba(160, 100, 40, 0.18)',
        gold: '0 4px 20px rgba(232, 170, 26, 0.25)',
      },
    },
  },
  plugins: [],
};
