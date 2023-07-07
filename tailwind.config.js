module.exports = {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: false, 
    theme: {
      extend: {
        fontFamily: {
          'DIN': ['DIN', 'sans-serif'], // 替换为你自定义字体的名称和堆栈
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }