import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
	| { type: '[Entry] - Add-Entry'; payload: Entry }
	| { type: '[Entry] - Entry-Update'; payload: Entry }
	| { type: '[Entry] - Entry-Delete'; payload: Entry }
	| { type: '[Entry] - Refresh-Date'; payload: Entry[] };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case '[Entry] - Add-Entry':
			return {
				...state,
				entries: [...state.entries, action.payload],
			};
		case '[Entry] - Entry-Update':
			return {
				...state,
				entries: state.entries.map(entry => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status;
						entry.description = action.payload.description;
					}
					return entry;
				}),
			};
		case '[Entry] - Entry-Delete':
			return {
				...state,
				entries: state.entries.filter(
					entry => entry._id !== action.payload._id
				),
			};

		case '[Entry] - Refresh-Date':
			return {
				...state,
				entries: [...action.payload],
			};

		default:
			return state;
	}
};
