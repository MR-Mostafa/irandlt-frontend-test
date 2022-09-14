import { GetServerSidePropsContext } from 'next';
import { useRecoilState } from 'recoil';

import CitySearch from '~root/components/CitySearch/CitySearch';
import { _CachedResponse, _CachedRevalidate } from '~root/constants/globalConstants';
import { flightDropdownStore, flightStore } from '~root/store/flightState';
import { cityListType } from '~root/types/cityType';
import { getCityList } from '~root/utils/getCityList';

const Flight = ({ cityList }: { cityList: cityListType }) => {
	const [dropdownState, setDropdownState] = useRecoilState(flightDropdownStore);
	const [flightState, setFlightState] = useRecoilState(flightStore);

	return (
		<>
			<CitySearch
				placeholder="مبداء"
				cities={cityList.data}
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
			/>

			<CitySearch
				placeholder="مقصد"
				cities={cityList.data}
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
			/>
		</>
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
