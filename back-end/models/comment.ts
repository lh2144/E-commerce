import mongoose from 'mongoose';
import product from './product';
const Schema = mongoose.Schema;

export const commentSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        title: {
            type: String,
            required: true,
        },
        nickName: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
