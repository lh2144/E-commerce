import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import { AddressSchema } from './address';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    loginAt: {
        type: Date,
        required: false
    },
    cart: {
        type: String,
        ref: 'Cart'
    },
    address: [AddressSchema]
});
export default mongoose.model('User', userSchema) ;

