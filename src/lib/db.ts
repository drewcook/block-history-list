import mongoose from 'mongoose'

import logger from './logger'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

const connectToMongo = async () => {
	// Restricted user for block-history
	const MONGODB_URI = 'mongodb+srv://block_history_user:xDYJC9Ke7JVg47@cluster0.ti874.mongodb.net/block-history'

	if (cached.conn) {
		logger.magenta(`Connected to MongoDB`)
		return cached.conn
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(mongoose => {
			logger.magenta(`Connected to MongoDB`)
			return mongoose
		})
	}

	cached.conn = await cached.promise
	return cached.conn
}

export default connectToMongo
