import { FC } from 'react';
import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardActions,
} from '@mui/material';
import { Entry } from '@/interfaces';

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	return (
		<Card sx={{ marginBottom: 1 }}>
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
