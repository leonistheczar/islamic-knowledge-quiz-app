/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // These reference the CSS variables that auto-switch
        'main-text': 'var(--main-text)',
        'main-background': 'var(--main-background)',
        'quiz-session': 'var(--quiz-session)',
        'main-primary': 'var(--main-primary)',
        'main-primary-5': 'var(--main-primary-5)',
        'main-primary-10': 'var(--main-primary-10)',
        'quiz-bg': 'var(--quiz-bg)',
        'main-secondary': 'var(--main-secondary)',
        'main-accent': 'var(--main-accent)',
        'main-accent-5': 'var(--main-accent-5)',
        'main-accent-10': 'var(--main-accent-10)',
        'hover-light': 'var(--hover-light)',
      },
      fontFamily: {
        'ibm': ['IBM Plex Sans', 'sans-serif'],
      }
    }
  },
  plugins: [],
};