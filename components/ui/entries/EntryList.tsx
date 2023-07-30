import { FC } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './';

export const EntryList: FC = () => {
	return (
		<div>
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
				<List sx={{ opacity: 1 }}>
					<EntryCard />
				</List>
			</Paper>
		</div>
	);
};
