import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        product: {
            type: Object,
            required: true
        }
    }]
});

export default mongoose.model('Order', orderSchema);
