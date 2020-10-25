import mongoose from 'mongoose';
import { AddressSchema } from './address';
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
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    amount: {
        type: Number,
        required: true
    },
    products: [{
        product: {
            type: Object,
            required: true
        }
    }]
});

export default mongoose.model('Order', orderSchema);
