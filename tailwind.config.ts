import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"background-dark": "#00021e",
				"card-dark": "#1a1d2e",
				"text-light": "#ffffff",
				"text-secondary": "#cccccc",
				"text-accent": "#aaaaaa",
			},
		},
	},
	plugins: [],
};
export default config;
