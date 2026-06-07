import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#00FBFB',
        dark: '#1A1A1D',
        grey: '#3A3A3D',
      },
    },
  },
  plugins: [],
}
export default config
