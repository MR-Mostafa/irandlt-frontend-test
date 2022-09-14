import { AxiosResponse } from 'axios';

import { API_Front } from '~root/api/API';
import { _DayInMs } from '~root/constants/globalConstants';
import { cityListType, cityType } from '~root/types/cityType';

import { dateCompare, setExpireDate } from './dateUtils';

export const getCityList = (() => {
	const cache: cityListType = {};

	return async () => {
		const now = Date.now();

		if (cache.data && cache.expireDate && dateCompare(cache.expireDate, now)) {
			cache.type = 'cached';

			return Promise.resolve(cache);
		}

		try {
			const data = await API_Front.get<any, AxiosResponse<cityType[], any>>('/cityList');

			if (data && data.status && data.status.toString().startsWith('2')) {
				cache.data = data.data;
				cache.expireDate = setExpireDate(_DayInMs * 7);
				cache.type = 'fetched';
				cache.status = 'successful';
			} else {
				cache.status = 'error';
			}

			return cache;
		} catch (error) {
			cache.data = undefined;
			cache.expireDate = undefined;
			cache.type = undefined;
			cache.status = 'error';

			return cache;
		}
	};
})();
