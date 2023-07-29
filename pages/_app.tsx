import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';
import { darkTheme, ligthTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
