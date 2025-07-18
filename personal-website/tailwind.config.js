/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        typewriter: {
          '0%': {
            width: '0'
          },
          '100%': {
            width: '100%'
          }
        },
        blink: {
          '0%, 50%': {
            opacity: '1'
          },
          '51%, 100%': {
            opacity: '0'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        'scale-pulse': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.5)'
          }
        },
        'fade-move': {
          '0%': {
            opacity: '0.4',
            transform: 'translate(0, 0)'
          },
          '25%': {
            opacity: '0.8',
            transform: 'translate(30px, -15px)'
          },
          '50%': {
            opacity: '0.2',
            transform: 'translate(-20px, -30px)'
          },
          '75%': {
            opacity: '0.6',
            transform: 'translate(-40px, 10px)'
          },
          '100%': {
            opacity: '0.4',
            transform: 'translate(0, 0)'
          }
        },
        'grow-shrink': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '33%': {
            transform: 'scale(1.8)'
          },
          '66%': {
            transform: 'scale(0.6)'
          }
        },
        drift: {
          '0%': {
            transform: 'translateX(0)'
          },
          '50%': {
            transform: 'translateX(25px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'blink-float': {
          '0%': {
            opacity: '0.3',
            transform: 'translateY(0)'
          },
          '25%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'translateY(-5px)'
          },
          '75%': {
            opacity: '0.1',
            transform: 'translateY(5px)'
          },
          '100%': {
            opacity: '0.3',
            transform: 'translateY(0)'
          }
        },
        twinkle: {
          '0%, 100%': {
            opacity: '0.2',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(2)'
          }
        },
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateX(30px) rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg) translateX(30px) rotate(-360deg)'
          }
        },
        spin: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      }
    },
  },
  plugins: [],
}