export interface ICityType {
	value: string;
	label: string;
	cityName: string;
	isCity: boolean;
}

export interface ICityListType {
	data?: ICityType[];
	type?: 'fetched' | 'cached';
	status?: 'successful' | 'error';
	expireDate?: string;
}
