import { AxiosError, AxiosResponse } from 'axios';

import { ISearchId } from '~root/types/cityType';

import { API } from './API';

type FetchDateType = {
	data: ISearchId | null;
	status: 'successful' | 'error' | null;
	errorMsg: string | null;
};

export const getFlights = async (id: string): Promise<FetchDateType> => {
	try {
		const data = await API.get<any, AxiosResponse<ISearchId, any>>(`/FlightSearch?id=${id}`);

		if (data && data.status && data.status.toString().startsWith('2')) {
			return {
				data: data.data,
				status: 'successful',
				errorMsg: null,
			};
		} else {
			return {
				data: null,
				status: 'error',
				errorMsg: null,
			};
		}
	} catch (error: unknown) {
		let errorMsg = null;

		if (error instanceof AxiosError) {
			errorMsg = error.response?.data?.error || null;
		}

		return {
			data: null,
			status: 'error',
			errorMsg,
		};
	}
};
