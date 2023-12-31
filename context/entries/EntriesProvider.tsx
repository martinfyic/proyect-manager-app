import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
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

	const { enqueueSnackbar } = useSnackbar();

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>('/entries', { description });
		dispatch({ type: '[Entry] - Add-Entry', payload: data });
	};

	const updateEntry = async (
		{ _id, description, status }: Entry,
		showSnackbar = false
	) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status,
			});
			dispatch({ type: '[Entry] - Entry-Update', payload: data });

			if (showSnackbar) {
				enqueueSnackbar('Entry updated', {
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			}
		} catch (error) {
			console.log({ error });
		}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: '[Entry] - Refresh-Date', payload: data });
	};
	useEffect(() => {
		refreshEntries();
	}, []);

	const deletEntry = async (entry: Entry) => {
		try {
			await entriesApi.delete<Entry>(`/entries/${entry._id}`);

			dispatch({ type: '[Entry] - Entry-Delete', payload: entry });

			enqueueSnackbar('Entry deleted', {
				variant: 'error',
				autoHideDuration: 1500,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<EntriesContext.Provider
			value={{ ...state, addNewEntry, updateEntry, deletEntry }}
		>
			{children}
		</EntriesContext.Provider>
	);
};
