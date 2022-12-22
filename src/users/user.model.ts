import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    relatedComplaints: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Complaint',
        }
    ],

    role: {
        type: String,
        enum: ['Admin', 'Vip', 'Regular'],
        default: 'Regular'
    }

});

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    relatedComplaints?: [mongoose.Types.ObjectId];
    role: string;
}

export enum Role {
    Admin = 'Admin',
    Vip = 'Vip',
    Regular = 'Regular'
}