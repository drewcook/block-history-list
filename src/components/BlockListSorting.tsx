import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

import { IBlock } from '@/lib/models'

import { SortOrder } from './BlockList'

type BlockListSortingProps = {
	blocks: IBlock[]
	onSortChange: (sortBy: string, sortOrder: SortOrder) => void
}
const BlockListSorting = ({ blocks, onSortChange }: BlockListSortingProps): JSX.Element => {
	const [sortBy, setSortBy] = useState('')
	const [sortOrder, setSortOrder] = useState<SortOrder>()

	const handleSortByChange = (event: SelectChangeEvent) => {
		const sortByValue = event.target.value
		setSortBy(sortByValue)
		onSortChange(sortByValue, sortOrder)
	}

	const handleSortOrderChange = (event: SelectChangeEvent) => {
		const sortOrderValue = event.target.value as SortOrder
		setSortOrder(sortOrderValue)
		onSortChange(sortBy, sortOrderValue)
	}

	return (
		<Box display="flex" justifyContent="space-evenly" width="100%">
			<FormControl fullWidth sx={{ mr: 2 }}>
				<InputLabel>Sort By</InputLabel>
				<Select value={sortBy} onChange={handleSortByChange}>
					<MenuItem value="">None</MenuItem>
					<MenuItem value="number">Number</MenuItem>
					<MenuItem value="size">Size</MenuItem>
					<MenuItem value="timestamp">Timestamp</MenuItem>
					<MenuItem value="nonce">Nonce</MenuItem>
					<MenuItem value="gasLimit">Gas Limit</MenuItem>
					<MenuItem value="hash">Hash</MenuItem>
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel>Sort Order</InputLabel>
				<Select value={`${sortOrder}`} onChange={handleSortOrderChange}>
					<MenuItem value="">None</MenuItem>
					<MenuItem value="asc">Ascending</MenuItem>
					<MenuItem value="desc">Descending</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default BlockListSorting
