import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AddressSchema = new Schema({
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: Number,
    phone: Number
});

export default mongoose.model('Address', AddressSchema);
