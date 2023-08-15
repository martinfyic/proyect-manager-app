import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardActions,
} from '@mui/material';
import { Entry } from '@/interfaces';
import { UIContext } from '@/context';
import { dateFunction } from '@/utils';

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging, isDragging } = useContext(UIContext);
	const router = useRouter();

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('dragAndDropEntry', entry._id);
		startDragging();
	};

	const onDragEnd = () => {
		endDragging();
	};

	const onClick = () => {
		router.push(`/entries/${entry._id}`);
	};

	return (
		<Card
			sx={{ marginBottom: 1, opacity: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={onClick}
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
					<Typography variant='body2'>
						{dateFunction.getFormatDistanceToNow(entry.createdAt)}
					</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
