import type { MantineThemeOverride } from '@mantine/core';

const themeOptions: MantineThemeOverride = {
	dir: 'rtl',
	loader: 'oval',
	fontFamily:
		"'IRANSansX', Arial, Tahoma, 'Times New Roman', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	fontFamilyMonospace: '"IRANSansX", Consolas, "Lucida Console", Monaco, monospace',
	headings: {
		fontFamily:
			"'IRANSansX', Arial, Tahoma, 'Times New Roman', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		fontWeight: 'bold',
		sizes: {
			h1: { fontSize: 30 },
		},
	},
	defaultRadius: 'xs',
	transitionTimingFunction: 'ease-in-out',
	lineHeight: 1.9,
	breakpoints: {
		xs: 576,
		sm: 768,
		md: 992,
		lg: 1200,
		xl: 1400,
	},
	fontSizes: {
		xs: 13,
		sm: 13,
		md: 14,
		lg: 15,
		xl: 15,
	},
	radius: {
		xs: 2,
		sm: 4,
		md: 6,
		lg: 8,
		xl: 10,
	},
	spacing: {
		xs: 8,
		sm: 10,
		md: 12,
		lg: 16,
		xl: 20,
	},
};

export default themeOptions;
