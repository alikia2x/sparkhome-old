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
            screens: {
                'lmb': '400px', //Large mobile
                'mb': '368px', //Medium mobile
                'smb': '352px', //Small mobile
                'xsmb': '320px', //Extra small mobile
                'mh': {'raw': '(max-height: 768px)'}, //Medium height
                'st': {'raw': '(max-height: 576px)'}, //Short
                'xst': {'raw': '(max-height: 512px)'}, //Extra Short
                '2xst': {'raw': '(max-height: 384px)'},
                '3xst': {'raw': '(max-height: 256px)'},
            },
            transitionDuration: {
                '250': '250ms',
            },
            height: {
                '100': '25rem',
                '112': '28rem',
                '120': '30rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '168': '42rem'
            },
            width: {
                '100': '25rem',
                '112': '28rem',
                '120': '30rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '168': '42rem'
            },
            spacing: {
                '42': '10.5rem',
            },
            inset: {
                '42': '10.5rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}