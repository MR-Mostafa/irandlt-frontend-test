import { Global } from '@mantine/core';

const GlobalStyles = () => {
	return (
		<Global
			styles={(theme) => ({
				':root': {
					fontSize: 'var(--root-font-size)',
				},
				'body': {
					width: '100%',
					minHeight: '100vh',
					margin: 0,
					padding: 0,
					outline: 'none',
					border: 'none',
					direction: 'rtl',
					overflowX: 'hidden',
					overflowY: 'auto',
					fontSize: 'var(--body-font-size)',
					fontWeight: 'var(--body-font-weight)',
					color: 'var(--body-text-color)',
					backgroundColor: 'var(--body-background-color)',
					textAlign: 'right',
					WebkitTextSizeAdjust: '100%',
					WebkitTapHighlightColor: 'transparent',
				},

				'.mantine-Button-root': {
					'fontWeight': 'normal',

					'&:focus, &:active': {
						transform: 'none !important',
					},
				},

				'.mantine-List-root': {
					fontSize: '1rem',
				},

				'.mantine-List-itemWrapper': {
					'& span': {
						display: 'inline !important',
					},
				},

				'@media (min-width: 576px, )': {},
				'@media (min-width: 768px)': {},
				'@media (min-width: 992px)': {},
				'@media (min-width: 1200px)': {},
				'@media (min-width: 1400px)': {},

				// xs & sm
				'@media (max-width: 992px)': {
					':root': {
						fontSize: 'calc(var(--root-font-size) * 0.86666) !important',
					},
				},

				// md
				'@media (min-width: 992px) and (max-width: 1200px)': {
					':root': {
						fontSize: 'calc(var(--root-font-size) * 0.93333) !important',
					},
				},
			})}
		/>
	);
};

export default GlobalStyles;
