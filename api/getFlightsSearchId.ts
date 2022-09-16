import { AxiosError, AxiosResponse } from 'axios';

import { ISearchId } from '~root/types/cityType';

import { API } from './API';

type FetchDateType = {
	data: ISearchId | null;
	status: 'successful' | 'error' | null;
	errorMsg: string | null;
};

interface IProps {
	source: string;
	destination: string;
	date: string;
}

export const getFlightsSearchId = async ({ source, destination, date }: IProps): Promise<FetchDateType> => {
	try {
		const data = await API.post<any, AxiosResponse<ISearchId, any>>('/FlightSearch', {
			adult: 1,
			child: 0,
			depart: date,
			dest: destination,
			source,
		});

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
