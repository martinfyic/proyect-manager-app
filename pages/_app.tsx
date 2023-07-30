import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';
import { darkTheme, ligthTheme } from '@/themes';
import { EntriesProvider, UIProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<EntriesProvider>
			<UIProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</UIProvider>
		</EntriesProvider>
	);
}
