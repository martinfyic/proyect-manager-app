import { Layout } from '@/components/layouts';
import { Typography } from '@mui/material';

export default function HomePage() {
	return (
		<Layout title='Home Page | Project Manager App'>
			<Typography
				variant='h1'
				color='primary'
			>
				Proyect Manager APP with Next Js & TypeScript
			</Typography>
		</Layout>
	);
}
