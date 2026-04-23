/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MNC Grade Axis Palette
        axis: {
          blue: '#2563eb', // The core MNC blue
          emerald: '#10b981', // For "System Nominal" statuses
          amber: '#f59e0b', // For Premium/Pro features
        },
        neon: {
          blue: '#00f3ff',
          green: '#00ff9d',
          pink: '#ff00c8',
          yellow: '#fffc00',
        },
        background: {
          dark: '#000000', // Pure black for high-end OLED contrast
          card: '#09090b', // Zinc-950 equivalent for glass cards
        }
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 243, 255, 0.5)',
        'neon-glow': '0 0 20px rgba(0, 243, 255, 0.7)',
        'axis-glow': '0 0 30px rgba(37, 99, 235, 0.2)', // Subtle MNC glow
        'pro-glow': '0 0 30px rgba(245, 158, 11, 0.2)', // Premium Amber glow
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.5s linear infinite',
        'subtle-float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
