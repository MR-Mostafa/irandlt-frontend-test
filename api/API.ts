import axios from 'axios';

const timeout = 10000; // 10s
const contentType = 'application/json';
const responseType = 'json';

export const API = axios.create({
	baseURL: process.env.API,
	timeout,
	headers: {
		'content-type': contentType,
	},
	responseType,
});
