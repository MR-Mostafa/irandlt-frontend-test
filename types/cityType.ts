export interface ICityType {
	value: string;
	label: string;
	cityName: string;
	isCity: boolean;
}

export interface ICityListType {
	data: ICityType[] | null;
	type: 'fetched' | 'cached' | null;
	status: 'successful' | 'error' | null;
	expireDate: string | null;
}
