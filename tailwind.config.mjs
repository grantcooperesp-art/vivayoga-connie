/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        sand: '#F5E6D3',
        ocean: '#4A8B8C',
        'ocean-dark': '#2F5E60',
        cream: '#FDFBF7',
        terracotta: '#D4785A',
        'dark-slate': '#2C3E3D',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
