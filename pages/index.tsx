import type { NextPage } from 'next';
import Link from 'next/link';

import { Box, Button } from '@mantine/core';

const Home: NextPage = () => {
	return (
		<>
			<Box sx={{ textAlign: 'center' }}>
				<Box component="p" py={15}>
					جهت مشاهده صفحه پرواز بر روی لینک مربوطه کلیک نمایید.
				</Box>

				<Link href="/flight" passHref>
					<Button component="a" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} size="lg" radius="lg">
						ورود به صفحه جستجو پرواز
					</Button>
				</Link>
			</Box>
		</>
	);
};

export default Home;
