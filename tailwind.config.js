/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo-150': '#d3dcfe',
        'indigo-650': '#493fd7',
        'indigo-750': '#3d34b6',
        'cyan-650': '#0b82a1',
        'cyan-750': '#086982',
        'slate-250': '#d6dee5',
        'slate-350': '#afbccc',
        'slate-450': '#7c8ba1',
        'slate-550': '#55647a',
        'slate-650': '#3d4b5f',
        'slate-850': '#162032',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-cyan': 'glowCyan 3s infinite alternate',
        'glow-indigo': 'glowIndigo 3s infinite alternate',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowCyan: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2), 0 0 10px rgba(6, 182, 212, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 35px rgba(6, 182, 212, 0.3)' },
        },
        glowIndigo: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.2), 0 0 10px rgba(99, 102, 241, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 35px rgba(99, 102, 241, 0.3)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
