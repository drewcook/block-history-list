import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { Address } from 'viem'
import { PublicClient, useAccount, usePublicClient, useWalletClient, WalletClient } from 'wagmi'

// Create context
type Web3ContextProps = {
	publicClient: PublicClient
	walletClient: WalletClient | undefined
	address: Address | undefined
}

// @ts-ignore
const Web3Context = createContext<Web3ContextProps>({})

// Context provider
type Web3ProviderProps = {
	children: ReactNode
}
export const Web3Provider = ({ children }: Web3ProviderProps): JSX.Element => {
	const { address } = useAccount()
	const { data, isError, isLoading } = useWalletClient()
	const publicClient = usePublicClient()
	const [walletClient, setWalletClient] = useState<WalletClient | undefined>(undefined)

	// Get wallet client and get hasher contract
	useEffect(() => {
		if (data) {
			setWalletClient(data)
		}
	}, [data])

	return (
		<Web3Context.Provider
			value={{
				publicClient,
				walletClient,
				address,
			}}
		>
			{children}
		</Web3Context.Provider>
	)
}

// Context hook
export const useWeb3 = () => {
	const context: Partial<Web3ContextProps> = useContext(Web3Context)

	if (context === undefined) {
		throw new Error('useWeb3 must be used within an Web3Provider component.')
	}
	return context
}
