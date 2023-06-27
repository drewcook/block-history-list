import { Box, Card, CardContent, Typography } from '@mui/material'

import { Block } from '@/lib/types'

type BlockCardProps = {
	block: Block
}

const styles = {
	card: {
		my: 4,
		width: '100%',
	},
}

const BlockCard = ({ block }: BlockCardProps): JSX.Element => {
	return (
		<Card sx={styles.card}>
			<CardContent>
				<Box>
					<Typography variant="body1">
						<strong>Size:</strong> {block.size}
					</Typography>
				</Box>
				<Box>
					<Typography variant="body1">
						<strong>Number:</strong> {block.number}
					</Typography>
				</Box>
				<Box>
					<Typography variant="body1">
						<strong>Timestamp:</strong> {block.timestamp}
					</Typography>
				</Box>
				<Box>
					<Typography variant="body1">
						<strong>Nonce:</strong> {block.nonce}
					</Typography>
				</Box>
				<Box>
					<Typography variant="body1">
						<strong>Gas Limit:</strong> {block.gasLimit}
					</Typography>
				</Box>
				<Box>
					<Typography variant="body1">
						<strong>Hash:</strong> {block.hash}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

export default BlockCard
