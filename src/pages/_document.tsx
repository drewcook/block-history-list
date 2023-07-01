import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="The latest blocks on Sepolia testnet" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,600;0,800;1,300;1,400;1,600;1,800&display=swap"
					rel="stylesheet"
				/>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
