/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1.25rem"
        },
        center: true
      },
      colors: {
        dark: "#0D1321",// "#1a191f",
        "light-dark": "#171E2E",
      },
      boxShadow: {
        card: "8px 16px 32px rgba(113, 128, 150, 0.08)",
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
