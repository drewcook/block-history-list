import '@/styles/globals.css'

import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import AppHeader from '@/components/AppHeader'
import { Web3Provider } from '@/components/Web3Provider'
import { wagmiConfig } from '@/config/wagmi'
import theme from '@/lib/theme'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<Web3Provider>
				<ThemeProvider theme={theme}>
					<>
						<AppHeader />
						<Component {...pageProps} />
					</>
				</ThemeProvider>
			</Web3Provider>
		</WagmiConfig>
	)
}
