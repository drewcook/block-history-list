import { sepolia } from '@wagmi/core/chains'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

// Support Sepolia and prefer Alchemy
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[sepolia],
	[
		alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_KEY}` }),
		publicProvider(), // fallback
	],
)

// Set up wagmi config
export const wagmiConfig = createConfig({
	autoConnect: false,
	connectors: [
		new MetaMaskConnector({ chains }),
		new InjectedConnector({
			chains,
			options: {
				name: 'Browser Wallet',
				shimDisconnect: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
})
