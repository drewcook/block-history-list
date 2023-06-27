import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IBlock extends Document {
	number: number
	size: number
	timestamp: number
	nonce: number
	gasLimit: number
	hash: string
}

const BlockSchema: Schema = new Schema({
	number: { type: Number, required: true },
	size: { type: Number, required: true },
	timestamp: { type: Number, required: true },
	nonce: { type: Number, required: true },
	gasLimit: { type: Number, required: true },
	hash: { type: String, required: true },
})

const BlockModel: Model<IBlock> = mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema)

export default BlockModel
