// Tailwind CSS build config — produces styles/tailwind.css from styles/input.css.
// Rebuild after adding new utility classes to index.html:
//   1. Download once: https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-windows-x64.exe
//   2. Run: tailwindcss.exe -i .\styles\input.css -o .\styles\tailwind.css --minify
// (Linux/Mac binaries also available on the same release page.)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['"DM Serif Text"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
