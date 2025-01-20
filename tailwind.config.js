/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'square-texture':
          "url('https://img.freepik.com/free-vector/abstract-background-with-modern-techno-design_1048-5494.jpg?uid=R183734419&ga=GA1.1.48591340.1727965003')",
        'footer-texture': "url('/img/5494.jpg')",
      },
    },
  },
  plugins: [],
}
