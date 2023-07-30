import { Context, createContext } from 'react';
import { Entry } from '@/interfaces';

interface ContextProps {
	entries: Entry[];
}

export const EntriesContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
