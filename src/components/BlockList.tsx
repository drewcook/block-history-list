import { Many, orderBy } from 'lodash'
import { Fragment, useEffect, useState } from 'react'

import { QUERY_INTERVAL } from '@/config/constants'
import { IBlock } from '@/lib/models'

import BlockCard from './BlockCard'
import BlockListSorting from './BlockListSorting'

export type SortOrder = Many<boolean | 'asc' | 'desc'> | undefined

const BlockList = () => {
	const [blocks, setBlocks] = useState<IBlock[]>([])
	const [sortBy, setSortBy] = useState('')
	const [sortOrder, setSortOrder] = useState<SortOrder>()

	useEffect(() => {
		const fetchBlocks = async () => {
			try {
				const response = await fetch('/api/blocks')
				const data = await response.json()
				// Sort blocks if either field is enabled
				if (sortBy !== '' && sortOrder) {
					const sortedBlocks = orderBy(data, sortBy, sortOrder)
					setBlocks(sortedBlocks)
				} else {
					setBlocks(data)
				}
			} catch (error) {
				console.error('Error fetching blocks:', error)
			}
		}

		// Fetch blocks when the component mounts and periodically fetch new blocks per the interval
		fetchBlocks()
		const interval = setInterval(fetchBlocks, QUERY_INTERVAL)

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval)
	}, [])

	// Sorting callback to just update the state
	const handleSortChange = (_sortBy: string, _sortOrder: SortOrder) => {
		setSortBy(_sortBy)
		setSortOrder(_sortOrder)
		const sortedBlocks = orderBy(blocks, _sortBy, _sortOrder)
		setBlocks(sortedBlocks)
	}

	return (
		<>
			<BlockListSorting blocks={blocks} onSortChange={handleSortChange} />
			{blocks.map((block, idx) => (
				<Fragment key={idx}>
					<BlockCard block={block} />
				</Fragment>
			))}
		</>
	)
}

export default BlockList
