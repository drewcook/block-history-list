import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'

import BlockList from '@/components/BlockList'

import styles from '../styles/BlockListPage.module.css'

const BlockListPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Block History | Recent Blocks</title>
			</Head>
			<Box component="main" className={styles.main}>
				<Typography variant="h2" mb={4}>
					Recent Blocks
				</Typography>
				<BlockList />
			</Box>
		</>
	)
}

export default BlockListPage
