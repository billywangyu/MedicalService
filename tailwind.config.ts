/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
        'gradient-green': 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
      },

    },
  },
  plugins: [],
};