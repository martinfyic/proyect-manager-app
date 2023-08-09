import { FC, ReactNode, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
};

interface Props {
	children?: ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>('/entries', { description });

		dispatch({ type: '[Entry] - Add-Entry', payload: data });
	};

	const updateEntry = (entry: Entry) => {
		dispatch({ type: '[Entry] - Entry-Update', payload: entry });
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: '[Entry] - Refresh-Date', payload: data });
	};
	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};
