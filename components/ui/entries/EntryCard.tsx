import { DragEvent, FC, useContext } from 'react';
import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardActions,
} from '@mui/material';
import { Entry } from '@/interfaces';
import { UIContext } from '@/context';

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging, isDragging } = useContext(UIContext);

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('dragAndDropEntry', entry._id);
		startDragging();
	};

	const onDragEnd = () => {
		endDragging();
	};

	return (
		<Card
			sx={{ marginBottom: 1, opacity: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: 'flex', justifyContent: 'end', padding: 2 }}
				>
					<Typography variant='body2'>hace 30 minutos</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
