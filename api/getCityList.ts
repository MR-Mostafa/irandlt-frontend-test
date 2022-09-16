import { AxiosResponse } from 'axios';

import { API } from '~root/api/API';
import { _DayInMs } from '~root/constants/globalConstants';
import { ICityListType, ICityType } from '~root/types/cityType';
import { dateCompare, setExpireDate } from '~root/utils/dateUtils';

export const getCityList = (() => {
	const cache: ICityListType = {
		data: null,
		expireDate: null,
		status: null,
		type: null,
	};

	return async () => {
		const now = Date.now();

		if (cache.data && cache.expireDate && dateCompare(cache.expireDate, now)) {
			cache.type = 'cached';

			return Promise.resolve(cache);
		}

		try {
			const data = await API.get<any, AxiosResponse<ICityType[], any>>('/city/?query=&cache=wb');

			if (data && data.status && data.status.toString().startsWith('2')) {
				cache.data = data.data;
				cache.expireDate = setExpireDate(_DayInMs * 7);
				cache.type = 'fetched';
				cache.status = 'successful';
			} else {
				cache.data = null;
				cache.expireDate = null;
				cache.type = null;
				cache.status = 'error';
			}

			return cache;
		} catch (error) {
			cache.data = null;
			cache.expireDate = null;
			cache.type = null;
			cache.status = 'error';

			return cache;
		}
	};
})();
