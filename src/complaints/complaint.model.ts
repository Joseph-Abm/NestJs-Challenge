import * as mongoose from 'mongoose';

export const ComplaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'],
        default: 'PENDING'
    },

    creator: {
        type: mongoose.Types.ObjectId,
        required: true
    }



}, { timestamps: true });

export interface Complaint {
    title: string;
    body: string;
    status: status;
    creator: mongoose.Types.ObjectId;
}

export enum status {
    Pending = 'PENDING',
    InProgress = 'INPROGRESS',
    Resolved = 'RESOLVED',
    Rejected = 'REJECTED'
}