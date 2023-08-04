import { DragEvent, FC, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '@/interfaces';
import { EntriesContext, UIContext } from '@/context';
import styles from './EntryList.module.css';

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endDragging } = useContext(UIContext);

	const entriesByStatus = useMemo(
		() => entries.filter(entry => entry.status === status),
		[entries]
	);

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('dragAndDropEntry');
		const entry = entries.find(ent => ent._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endDragging();
	};

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ''}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 190px)',
					overflow: 'auto',
					backgroundColor: 'transparent',
					padding: '3px 5px',
					'&::-webkit-scrollbar': {
						width: '3px',
						bgcolor: '#454545',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#4a148c',
						border: '7px none #fffff',
						borderRadius: '10px',
					},
				}}
			>
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
					{entriesByStatus.map(entry => (
						<EntryCard
							key={entry._id}
							entry={entry}
						/>
					))}
				</List>
			</Paper>
		</div>
	);
};
