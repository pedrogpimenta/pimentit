module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF4500',
      },
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
      }
    },
  },
  variants: {
    border: ['last'],
  },
}
