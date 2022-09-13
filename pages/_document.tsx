import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { rtlConfig } from '~root/theme';

const stylesServer = createStylesServer(rtlConfig);

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [
				initialProps.styles,
				<ServerStyles html={initialProps.html} server={stylesServer} key='styles' />,
			],
		};
	}

	render() {
		return (
			<Html lang='fa' dir='rtl'>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
