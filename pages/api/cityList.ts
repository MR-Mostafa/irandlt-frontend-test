// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { AxiosResponse } from 'axios';

import { API } from '~root/api/API';
import { ICityType } from '~root/types/cityType';

type Data = ICityType[];
type Error = { message: string; name: string; code: string } | {};
type ResponseData = Data | Error;

const cityList = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
	if (req.method !== 'GET') return res.status(405).json({});

	try {
		return await API.get<any, AxiosResponse<ICityType[], any>>('/city/?query=&cache=wb')
			.then((data) => {
				return res.status(data.status).json(data.data);
			})
			.catch((err) => {
				const { message, name, code } = err;

				return res.status(500).json({ message, name, code });
			});
	} catch (err) {
		return res.status(500).json({ message: 'خطایی رخ داده است' });
	}
};

export default cityList;
