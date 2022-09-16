import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Box, Button, Grid } from '@mantine/core';

import { getCityList } from '~root/api/getCityList';
import CitySearch from '~root/components/CitySearch/CitySearch';
import DateRangePicker from '~root/components/DateRangePicker/DateRangePicker';
import { _CachedResponse, _CachedRevalidate } from '~root/constants/globalConstants';
import { flightDropdownStore, flightStore } from '~root/store/flightState';
import { ICityListType } from '~root/types/cityType';
import { toGregorianDate } from '~root/utils/dateUtils';

const Flight = ({ cityList }: { cityList: ICityListType }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [dropdownState, setDropdownState] = useRecoilState(flightDropdownStore);
	const [flightState, setFlightState] = useRecoilState(flightStore);

	const openNextDropdown = useCallback(() => {
		if (!flightState.source && dropdownState.source) {
			dropdownState.source.focus();
			dropdownState.source.click();
			return;
		}

		if (!flightState.destination && dropdownState.destination) {
			dropdownState.destination.focus();
			dropdownState.destination.click();
			return;
		}

		if (!flightState.date && dropdownState.date) {
			const date = dropdownState.date.querySelector('.date-input-wrapper input') as HTMLInputElement;
			date.focus();
			dropdownState.date.openCalendar();
			return;
		}
	}, [dropdownState, flightState]);

	useEffect(() => {
		return () => {
			setLoading(false);
		};
	}, []);

	return (
		<Grid
			sx={{
				maxWidth: 800,
				backgroundColor: '#F4F6FD',
				borderRadius: 15,
				margin: '2rem auto',
				boxShadow: '0px 4px 4px 0px #00000040',
				border: '1px solid #e1e8ff',
			}}
			gutter="lg"
			p={16}
		>
			<Grid.Col xl={8}>
				<Grid gutter={0} p={0} sx={{ position: 'relative' }}>
					<Grid.Col xl={6}>
						<CitySearch
							placeholder="مبداء"
							cities={cityList.data}
							inputStyles={{
								'borderBottomLeftRadius': 7,
								'borderTopLeftRadius': 7,
								'borderRight': '1px dashed #e9e9e9',

								'&:focus': { borderRightColor: '#e9e9e9' },
							}}
							icon={<Image src="/icons/flight-from-icon.svg" alt="مبداء" width={24} height={24} />}
							onSetDropdownState={(ref) => {
								if (dropdownState.source) return;

								setDropdownState((prev) => ({ ...prev, source: ref }));
							}}
							onDropdownOpen={(elem) => {
								if (!elem) return;
								elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
							}}
							onItemSubmit={(city) => {
								setFlightState((prev) => ({ ...prev, source: city }));
							}}
							onCheckIsValueEqual={() => {
								if (!flightState.source || !flightState.destination) return false;

								const isValueEqual = flightState.source.value === flightState.destination.value;

								if (isValueEqual) {
									setFlightState((prev) => ({ ...prev, source: undefined }));
								}

								return isValueEqual;
							}}
							onOpenNextDropdown={openNextDropdown}
						/>
					</Grid.Col>

					<Grid.Col xl={6}>
						<CitySearch
							placeholder="مقصد"
							cities={cityList.data}
							inputStyles={{ borderBottomRightRadius: 5, borderTopRightRadius: 5 }}
							icon={<Image src="/icons/flight-from-icon.svg" alt="مبداء" width={24} height={24} />}
							onSetDropdownState={(ref) => {
								if (dropdownState.destination) return;

								setDropdownState((prev) => ({ ...prev, destination: ref }));
							}}
							onDropdownOpen={(elem) => {
								if (!elem) return;
								elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
							}}
							onItemSubmit={(city) => {
								setFlightState((prev) => ({ ...prev, destination: city }));
							}}
							onCheckIsValueEqual={() => {
								if (!flightState.source || !flightState.destination) return false;

								const isValueEqual = flightState.source.value === flightState.destination.value;

								if (isValueEqual) {
									setFlightState((prev) => ({ ...prev, destination: undefined }));
								}

								return isValueEqual;
							}}
							onOpenNextDropdown={openNextDropdown}
						/>
					</Grid.Col>
				</Grid>
			</Grid.Col>

			<Grid.Col xl={4}>
				<DateRangePicker
					value={flightState.date}
					onDateSubmit={(val) => {
						setFlightState((prev) => ({ ...prev, date: val }));
					}}
					onSetDropdownState={(ref) => {
						if (dropdownState.date) return;

						setDropdownState((prev) => ({ ...prev, date: ref }));
					}}
					onOpenNextDropdown={openNextDropdown}
				/>
			</Grid.Col>

			<Grid.Col span={12} pt={15}>
				<Box sx={{ textAlign: 'right' }}>
					<Button
						color="dark"
						size="md"
						radius={5}
						loading={loading}
						styles={{
							root: {
								height: 48,
								width: 200,
							},
							icon: {
								img: {
									filter: flightState.source && flightState.destination && flightState.date ? 'invert(1)' : 'none',
									opacity: flightState.source && flightState.destination && flightState.date ? '1' : '0.3',
								},
							},
						}}
						leftIcon={<Image src="/icons/search-icon.svg" alt="جستجو" width={18} height={18} />}
						// disabled={!flightState.source || !flightState.destination || !flightState.date}
						onClick={() => {
							const source = flightState.source!.value;
							const destination = flightState.destination!.value;
							const gregorianDate = toGregorianDate(flightState.date!);

							setLoading(true);
							router.push(`/flight/${source}/${destination}/${gregorianDate}`);
						}}
					>
						جستجو
					</Button>
				</Box>
			</Grid.Col>
		</Grid>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	context.res.setHeader('Cache-Control', `public, s-maxage=${_CachedResponse}, stale-while-revalidate=${_CachedRevalidate}`);

	const data = await getCityList();

	return {
		props: { cityList: data },
	};
}

export default Flight;
