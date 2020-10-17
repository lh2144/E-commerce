import mongoose from 'mongoose';
import { commentSchema } from './comment';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory: Number,
    reviews: [commentSchema]
});
// productSchema.path('reviews').validate(function(v) {
//     if (
// });
export default mongoose.model('Product', productSchema);
