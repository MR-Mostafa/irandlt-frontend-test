export interface cityType {
	value: string;
	label: string;
	cityName: string;
	isCity: boolean;
}

export interface cityListType {
	data?: cityType[];
	type?: 'fetched' | 'cached';
	status?: 'successful' | 'error';
	expireDate?: string;
}
