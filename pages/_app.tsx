import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { rtlConfig, themeOptions, GlobalStyles } from '~root/theme';
import type { AppPropsWithLayout } from '~root/types/nextType';

import '~root/styles/styles.scss';
import { RecoilRoot } from 'recoil';

function App(props: AppPropsWithLayout) {
	const { Component, pageProps } = props;

	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page: any) => page);

	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<title>تست فرانت‌اند</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<MantineProvider
				withCSSVariables
				withGlobalStyles
				withNormalizeCSS={false}
				emotionCache={rtlConfig}
				theme={themeOptions}
			>
				<GlobalStyles />
				<RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
			</MantineProvider>
		</>
	);
}

export default App;
