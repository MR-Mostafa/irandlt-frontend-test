import Link from 'next/link';

import { Button, Grid, Title } from '@mantine/core';

import { navbarLinks } from '~root/constants/navbarConstant';

import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<Grid>
				<Grid.Col xl={8}>
					{navbarLinks.map((item, index) => {
						const { text, href } = item;

						return (
							<Link href={href} key={index} prefetch passHref>
								<Button
									component="a"
									variant="subtle"
									color="dark"
									size="lg"
									radius={0}
									styles={{
										root: {
											fontWeight: 'bold !important' as 'bold',
										},
									}}
								>
									{text}
								</Button>
							</Link>
						);
					})}
				</Grid.Col>

				<Grid.Col xl={4}>
					<Title order={1} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} align="left">
						Your Logo
					</Title>
				</Grid.Col>
			</Grid>
		</header>
	);
};

export default Header;
