import { ReactNode } from 'react';

import { Container } from '@mantine/core';

import Footer from '~root/components/Footer/Footer';
import Header from '~root/components/Header/Header';

const GlobalLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Container
			fluid
			px={15}
			sx={{
				'minHeight': '100vh',
				'display': 'flex',
				'flexDirection': 'column',
				'alignItems': 'stretch',
				'justifyContent': 'flex-start',

				'& > header, & > footer': {
					flex: '0 0 auto !important',
				},

				'& > main': {
					paddingTop: '1.25rem',
					paddingBottom: '1.25rem',
					flex: '1 1 auto !important',
				},
			}}
		>
			<Header />

			<main>{children}</main>

			<Footer />
		</Container>
	);
};

export default GlobalLayout;
