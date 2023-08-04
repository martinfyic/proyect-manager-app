import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description:
				'Pending: Voluptate commodo labore excepteur ut aliqua pariatur minim do in nisi ad velit elit mollit.',
			createdAr: Date.now(),
			status: 'pending',
		},
		{
			_id: uuidv4(),
			description:
				'In-Progress: Sunt aute voluptate pariatur ex in mollit laboris in adipisicing magna dolore excepteur laboris.',
			createdAr: Date.now() - 1000000,
			status: 'inProgres',
		},
		{
			_id: uuidv4(),
			description: 'Finished: Excepteur nulla et eiusmod ex ipsum eu.',
			createdAr: Date.now() - 1100000,
			status: 'finished',
		},
	],
};

interface Props {
	children?: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createdAr: Date.now(),
			status: 'pending',
		};

		dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
	};

	const updateEntry = (entry: Entry) => {
		dispatch({ type: '[Entry] - Entry-Update', payload: entry });
	};

	return (
		<EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};
