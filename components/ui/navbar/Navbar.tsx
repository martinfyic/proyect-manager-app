import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context';

export const Navbar: FC = () => {
	const { openSideMenu } = useContext(UIContext);

	return (
		<AppBar position='sticky'>
			<Toolbar>
				<IconButton
					size='large'
					edge='start'
					onClick={openSideMenu}
				>
					<MenuOutlinedIcon />
				</IconButton>

				<Link
					component={NextLink}
					href='/'
					passHref
					underline='none'
					color='white'
				>
					<Typography variant='h6'>PM App</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	);
};
