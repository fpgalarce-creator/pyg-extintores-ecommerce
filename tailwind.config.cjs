/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0b0d0f',
        coal: '#111418',
        ember: '#ff4d2d',
        emberDark: '#d1391f',
        blaze: '#ff8a1c',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 77, 45, 0.25), 0 12px 30px rgba(15, 18, 22, 0.6)'
      }
    },
  },
  plugins: [],
}
