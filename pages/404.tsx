import Head from 'next/head';
import Link from 'next/link';

import { Box, Button, Text } from '@mantine/core';

const Page404 = () => {
	return (
		<>
			<Head>
				<title>تست فرانت‌اند | یافت نشد</title>
			</Head>

			<Text align="center" size={60} pt={20} sx={{ fontWeight: 'bold', lineHeight: '1.6' }}>
				404
			</Text>

			<Text align="center" size={25} sx={{ fontWeight: 'bold' }}>
				صفحه مورد نظر یافت نشد.
			</Text>

			<Box sx={{ textAlign: 'center' }} py={20}>
				<Link href="/" passHref>
					<Button
						component="a"
						color="dark"
						radius={60}
						size="md"
						styles={{
							root: {
								'&:hover': {
									color: 'rgba(256,256,256,0.8)',
								},
							},
						}}
					>
						صفحه اصلی
					</Button>
				</Link>
			</Box>
		</>
	);
};

export default Page404;
