import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';
import { darkTheme, ligthTheme } from '@/themes';
import { EntriesProvider, UIProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={5}>
			<EntriesProvider>
				<UIProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</EntriesProvider>
		</SnackbarProvider>
	);
}
