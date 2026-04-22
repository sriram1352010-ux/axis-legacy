/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          green: '#00ff9d',
          pink: '#ff00c8',
          yellow: '#fffc00',
        },
        background: {
          dark: '#0a0a14',
          card: '#1a1a2e',
        }
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 243, 255, 0.5)',
        'neon-glow': '0 0 20px rgba(0, 243, 255, 0.7)',
        'neon-pink': '0 0 15px rgba(255, 0, 200, 0.5)',
        'neon-green': '0 0 15px rgba(0, 255, 157, 0.5)',
        'neon-yellow': '0 0 15px rgba(255, 252, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
