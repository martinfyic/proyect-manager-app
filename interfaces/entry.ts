export interface Entry {
	_id: string;
	description: string;
	createdAr: number;
	status: EntryStatus;
}

export type EntryStatus = 'pending' | 'inProgres' | 'finished';
