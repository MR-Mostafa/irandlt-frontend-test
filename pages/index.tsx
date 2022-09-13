import type { NextPage } from 'next';

import { Container } from '@mantine/core';

import Header from '~root/components/Header/Header';

const Home: NextPage = () => {
	return (
		<Container fluid>
			<Header />
		</Container>
	);
};

export default Home;
