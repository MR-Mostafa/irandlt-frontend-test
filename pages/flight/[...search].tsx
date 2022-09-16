import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import { Box, Button, Text } from '@mantine/core';

import { getFlights } from '~root/api/getFlights';
import { getFlightsSearchId } from '~root/api/getFlightsSearchId';
import { _CachedResponse, _CachedRevalidate, _CityValueRegex, _DateRegex } from '~root/constants/globalConstants';

interface IProps {
	hasError?: boolean;
	errorMsg?: string;
	flightsResult: any;
	source: string;
	destination: string;
	date: string;
	searchId: string;
}

const FlightSearchPage = ({ hasError = false, errorMsg, flightsResult, source, destination, searchId }: IProps) => {
	useEffect(() => {
		if (hasError || !flightsResult) return;

		console.clear();
		console.log(flightsResult);
	}, []);

	if (hasError || !flightsResult || !searchId) {
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
				<title>{`تست فرانت‌اند | جستجوی پرواز ${source} به ${destination}`}</title>
			</Head>

			<Text align="center" size={25} sx={{ fontWeight: 'bold' }} pt={30}>
				جهت مشاهده دیتای دریافت شده به کنسول مراجعه نمایید.
			</Text>

			<Box sx={{ textAlign: 'center' }} py={20}>
				<Link href={`/flight/${searchId}`} passHref>
					<Button
						component="a"
						color="indigo"
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
						لینک مشابه (بر اساس آی‌دی)
					</Button>
				</Link>
			</Box>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const {
		res,
		query: { search },
	} = context;

	res.setHeader('Cache-Control', `public, s-maxage=${_CachedResponse}, stale-while-revalidate=${_CachedRevalidate}`);

	const [source, destination, date] = (Array.isArray(search) && search.map((i) => i.trim())) || [undefined];

	// Not Found Page
	if (!source || !destination || !date || !_CityValueRegex.test(source) || !_CityValueRegex.test(destination) || !_DateRegex.test(date)) {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
		};
	}

	const getSearchId = await getFlightsSearchId({ source, destination, date });

	if (!getSearchId || !getSearchId.data || getSearchId.status === 'error') {
		return {
			props: {
				errorMsg: getSearchId.errorMsg,
				hasError: true,
			},
		};
	}
	const { sourceLabel, destinationLabel, searchId } = getSearchId.data;

	const flightsResult = await getFlights(getSearchId.data.searchId);

	const { data, errorMsg, status } = flightsResult;

	return {
		props: {
			flightsResult: data,
			errorMsg: errorMsg,
			hasError: status === 'error',
			source: sourceLabel,
			destination: destinationLabel,
			searchId: searchId,
		},
	};
}

export default FlightSearchPage;
