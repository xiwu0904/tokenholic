/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Alibaba Cloud brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Provider colors for Token Map
        alibaba: '#FF6A00',
        aws: '#FF9900',
        azure: '#0089D6',
        google: '#4285F4',
        openai: '#10A37F',
        other: '#9CA3AF',
      },
    },
  },
  plugins: [],
}
