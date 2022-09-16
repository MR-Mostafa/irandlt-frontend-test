import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import { Box, Button, Text } from '@mantine/core';

import { getFlights } from '~root/api/getFlights';
import { _CachedResponse, _CachedRevalidate } from '~root/constants/globalConstants';

interface IProps {
	hasError?: boolean;
	errorMsg?: string;
	flightsResult: any;
}

const FlightSearchPageById = ({ hasError, errorMsg, flightsResult }: IProps) => {
	useEffect(() => {
		if (hasError || !flightsResult) return;

		console.clear();
		console.log(flightsResult);
	}, []);

	if (hasError || !flightsResult) {
		return (
			<>
				<Head>
					<title>تست فرانت‌اند | خطا</title>
				</Head>

				<Text align="center" size={25} sx={{ fontWeight: 'bold', lineHeight: '1.3' }} pt={20}>
					{errorMsg ? errorMsg : 'خطایی رخ داده است.'}
				</Text>
				<Box sx={{ textAlign: 'center' }} py={20}>
					<Link href="/flight" passHref>
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
							بازگشت به صفحه جستجو پرواز
						</Button>
					</Link>
				</Box>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>{`تست فرانت‌اند | جستجوی پرواز براساس آی‌دی`}</title>
			</Head>

			<Text align="center" size={25} sx={{ fontWeight: 'bold' }} pt={30}>
				جهت مشاهده دیتای دریافت شده به کنسول مراجعه نمایید.
			</Text>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {
		res,
		query: { searchId },
	} = context;

	res.setHeader('Cache-Control', `public, s-maxage=${_CachedResponse}, stale-while-revalidate=${_CachedRevalidate}`);

	const flightsResult = await getFlights(searchId as string);

	const { data, errorMsg, status } = flightsResult;

	return {
		props: { flightsResult: data, errorMsg: errorMsg, hasError: status === 'error', searchId: searchId },
	};
}

export default FlightSearchPageById;
