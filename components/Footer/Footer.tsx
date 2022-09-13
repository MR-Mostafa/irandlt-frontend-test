import { Text } from '@mantine/core';

import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Text align="center" component="p" sx={{ direction: 'rtl', fontWeight: 'lighter' }}>
				Copyright © 2021–2022 example.com™. All rights reserved
			</Text>
		</footer>
	);
};

export default Footer;
