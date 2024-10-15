/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'dark-bg': '#0e0c15',
        'lighter-dark-bg': '#17151f',
        'xiaomi-color': '#fd6909',
        "slate-gray": "#6D6D6D",
        'icon-color1': '#ac6aff',
        'icon-color2': '#ffc876',
        'icon-color3': '#7adb78',
        'icon-color4': '#ff776f',
        'light-dark': '#2b2840',
        'light-purple': '#b64182',
        'light-blue': '#27a4cd',
      },
      screens: {
        'custom-900': "900px",
        'custom-380': "380px",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        kalam: ['Kalam', 'sans-serif'],
        sora: ['Sora', 'sans-serif']
      },
      backgroundImage: {
        'color-pattern': "url('assets/images/bullseye.png')",
        'gradient-bg': "url('assets/images/gradient.png')",
        'gradient-bg-small': "url('assets/images/gradientsmall.png')"
      },
    },
  },
  plugins: [],
}

