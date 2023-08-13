import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '@/database';
import { EntryModel, IEntry } from '@/models';

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		res.status(400).json({
			message: `Endpoint [${req.method}] ${req.url}/${id} invalid id`,
		});
	}

	switch (req.method) {
		case 'PUT':
			return updateEntries(req, res);
		case 'GET':
			return getEntryById(req, res);

		default:
			return res.status(400).json({
				message: `Endpoint [${req.method}] ${req.url}/${id} does not exist`,
			});
	}
}

const updateEntries = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await db.connect();

	const entryToUpdate = await EntryModel.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		return res.status(400).json({
			message: `Endpoint [${req.method}] ${req.url}/${id} there is no entry for that id: ${id}`,
		});
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body;

	try {
		entryToUpdate.description = description;
		entryToUpdate.status = status;
		await entryToUpdate.save();

		await db.disconnect();
		return res.status(200).json(entryToUpdate);
	} catch (error: any) {
		await db.disconnect();
		return res.status(400).json({ message: error.errors.status.message });
	}
};

const getEntryById = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;
	await db.connect();

	const entry = await EntryModel.findById(id);
	await db.disconnect();

	if (!entry) {
		return res.status(400).json({
			message: `Endpoint [${req.method}] ${req.url}/${id} there is no entry for that id: ${id}`,
		});
	}

	return res.status(200).json(entry);
};
