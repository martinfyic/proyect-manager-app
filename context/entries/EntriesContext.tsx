import { Context, createContext } from 'react';
import { Entry } from '@/interfaces';

interface ContextProps {
	entries: Entry[];
	addNewEntry: (description: string) => void;
	updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
	deletEntry: (entry: Entry) => void;
}

export const EntriesContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
