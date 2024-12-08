/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {

		backgroundImage: {
			'gradient-hero-bg': 'linear-gradient(230deg, #01399A, #001334)',
		},
  		colors: {
  			'primary-blue': '#5f6FFF',
  			gray100: 'rgba(var(--gray100))',
  			gray200: 'rgba(var(--gray200))',
  			gray300: 'rgba(var(--gray300))',
  			gray500: 'rgba(var(--gray500))',
  			gray600: 'rgba(var(--gray600))',
  			gray800: 'rgba(var(--gray800))',
  			gray900: 'rgba(var(--gray900))',
  			stone100: 'rgba(var(--stone100))',
  			WHITE: 'rgba(var(--WHITE))',
  			BLACK: 'rgba(var(--BLACK))',
  			cyan600: 'rgba(var(--cyan600))',
  			'card-white': 'rgba(var(--card-white))',
  			'primary-orange': '#ff6a00',

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		gridTemplateColumns: {
  			auto: 'repeat(auto-fill, minmax(200px,1fr))'
  		},
  		screens: {
  			'380px': '380px',
  			'440px': '440px',
  			'525px': '525px',
  			'900px': '900px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			shine: 'shine var(--duration) infinite linear',
			scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite"
  		},
  		keyframes: {
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			},

			scroll: {
				to: {
					transform: "translateX(calc(-50% - 0.5rem))"
				}
			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
