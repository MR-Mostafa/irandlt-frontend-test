import axios from 'axios';

const timeout = 10000; // 10s
const contentType = 'application/json';
const responseType = 'json';

export const API_Back = axios.create({
	baseURL: process.env.API,
	timeout,
	headers: {
		'content-type': contentType,
	},
	responseType,
});

export const API_Front = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	timeout,
	headers: {
		'content-type': contentType,
	},
	responseType,
});
