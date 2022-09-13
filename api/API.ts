import axios from 'axios';

const API = axios.create({
	baseURL: 'https://flightio.com/',
	timeout: 10000, // 10s
	headers: {
		'content-type': 'application/json',
	},
	responseType: 'json',
});

export const getFetcher = (url: string) => API.get(url).then((res) => res);

export const postFetcher = (url: string, data: object = {}) =>
	API.post(url, data).then((res) => res);

export default API;
