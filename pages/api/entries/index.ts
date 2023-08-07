import { db } from '@/database';
import { EntryModel, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IEntry | IEntry[];

export default function entriesHandler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntries(res);

		default:
			return res.status(400).json({
				message: `Endpoint [${req.method}] ${req.url} does not exist`,
			});
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await db.connect();
	const entries = await EntryModel.find({}).sort({ createdAt: 'ascending' });
	await db.disconnect();

	res.status(200).json(entries);
};
