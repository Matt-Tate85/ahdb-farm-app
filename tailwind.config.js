// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // AHDB brand colors
        'ahdb-green': '#00843D',
        'ahdb-blue': '#0082CA',
        'ahdb-red': '#E4002B',
        'ahdb-orange': '#FF8200',
        // Sector colors
        'cereals': '#F5A623',
        'dairy': '#27AE60',
        'beef': '#E74C3C',
        'pork': '#9B59B6',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      screens: {
        'xs': '480px',
        // Other breakpoints use Tailwind defaults:
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      minHeight: {
        'screen-no-nav': 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
}
