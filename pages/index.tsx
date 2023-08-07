import { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';

const HomePage: NextPage = () => {
	return (
		<Layout title='Home Page | Project Manager App'>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					sm={4}
				>
					<Card sx={{ height: 'calc( 100vh - 100px )' }}>
						<CardHeader title='Pending' />
						<NewEntry />
						<CardContent>
							<EntryList status='pending' />
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					xs={12}
					sm={4}
				>
					<Card sx={{ height: 'calc( 100vh - 100px )' }}>
						<CardHeader title='In Progress' />
						<CardContent>
							<EntryList status='inProgress' />
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					xs={12}
					sm={4}
				>
					<Card sx={{ height: 'calc( 100vh - 100px )' }}>
						<CardHeader title='Completed' />
						<CardContent>
							<EntryList status='finished' />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default HomePage;
