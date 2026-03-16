// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelOrange: '#ffc593',
        violet: '#bc7198',
        blue: '#5a77ff',
        darkgrey: '#5a5a5a',
        grey: '#dfdfdf',
      },
    },
  },
  plugins: [],
}

export default config