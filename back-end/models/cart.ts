import mongoose from 'mongoose';
import { AddressSchema } from './address';
import { productSchema } from './product';
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    shippingAddress: {
        type: AddressSchema,
        required: true
    },
    contactEmail: String,
    price: {
        type: Number,
        required: true
    },
    cartItem: [productSchema]
});
