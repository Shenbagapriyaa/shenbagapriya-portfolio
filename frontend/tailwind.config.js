/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1F2333',
        slate: '#5B6178',
        violet: '#7C6FE0',
        violetDeep: '#5B4FD1',
        pink: '#FF9FC7',
        babyBlue: '#8FC7FF',
        mint: '#8FE3C9',
        iceBlue: '#F4F8FF',
        lavenderMist: '#F8F6FF',
        pearl: '#FAFAFA'
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      backdropBlur: { xs: '2px' }
    }
  },
  plugins: []
};
