import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors:{
      'main-color': '#ff5234',
      'main-hover-color' : '#ef3515',
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}
export default config
