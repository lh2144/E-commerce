import mongoose from 'mongoose';
import { AddressSchema } from './address';
import { productSchema } from './product';
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    _id: String,
    shippingAddress: {
        type: AddressSchema,
        required: false
    },
    contactEmail: String,
    totalPrice: {
        type: Number,
        required: true
    },
    items: [{productName: String, price: Number, quantity: Number}]
});

export default mongoose.model('Cart', cartSchema);
