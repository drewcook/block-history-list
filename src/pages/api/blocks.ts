// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { FETCH_AND_STORE_INTERVAL } from '@/config/constants'
import connectToMongo from '@/lib/db'
import BlockModel, { IBlock } from '@/lib/models'

// Retrieve all blocks from the database
const getBlocksFromDatabase = async () => {
	await connectToMongo()
	const blocks = await BlockModel.find({})
	return blocks
}

// Add a new Block record into the database if it doesn't already exist
const addBlockToDatabase = async (block: IBlock) => {
	await connectToMongo()
	const existingBlock = await BlockModel.findOne({ number: block.number })
	if (!existingBlock) await BlockModel.create(block)
}

// Fetch the data from external API
// Add the data as a new record in the database
const fetchAndStoreLatestBlockData = async () => {
	try {
		// Prepare the request
		const infuraAPIUrl = 'https://sepolia.infura.io/v3/9d1b5930f82f479d89cf87310d59b51b'
		const infuraAPIPayload = {
			jsonrpc: '2.0',
			method: 'eth_getBlockByNumber',
			params: ['latest', true],
			id: 1,
		}
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(infuraAPIPayload),
		}

		// Make and parse the request
		const response = await fetch(infuraAPIUrl, fetchOptions)
		const data = await response.json()
		const blockData = data.result

		// Add it to the database
		await addBlockToDatabase(blockData)
	} catch (error) {
		console.error('Error fetching latest block data:', error)
	}
}
// Periodically run this on an interval as a background job
setInterval(fetchAndStoreLatestBlockData, FETCH_AND_STORE_INTERVAL)

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBlock[]>) {
	switch (req.method) {
		case 'GET':
			// Return all blocks in the database
			const blocks = await getBlocksFromDatabase()
			res.status(200).json(blocks)
		default:
			res.status(405).end() // Method Not Allowed
	}
}
