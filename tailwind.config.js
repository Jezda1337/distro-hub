/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				scale: {
					"0%": { transform: "scale(0)", opacity: "1" },
					"100%": { transform: "scale(1.5)", opacity: "0" },
				},
			},
			animation: {
				scale: "scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				scale_delay: "scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite -1s",
			},
		},
	},
	plugins: [],
}
