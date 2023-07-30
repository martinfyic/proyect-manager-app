import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardActions,
} from '@mui/material';

export const EntryCard = () => {
	return (
		<Card sx={{ marginBottom: 1 }}>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						Here is the description
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
