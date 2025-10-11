/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        banana: {
          50:  '#fff8db',
          100: '#fff1b8',
          200: '#ffe27a',
          300: '#ffd34e',
          400: '#f9c423',
          500: '#efb008',
          600: '#d99b06',
        },
        ink: '#3a3000',
        line: '#eae8e1',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        inset: 'inset 0 1px 0 rgba(0,0,0,0.04)'
      },
      borderRadius: { pill: '999px' },
      maxWidth: {
        page: '980px'
      },
      fontFamily: {
        ui: ['-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial','Apple Color Emoji','Segoe UI Emoji','Noto Sans CJK SC','sans-serif']
      }
    },
  },
  plugins: [],
}
