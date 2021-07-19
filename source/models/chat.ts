
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const ChatSchema = new Schema({
    sender: {
        type: String,
        required: 'sender id  required'
    },
    receiver: {
        type: String,
        required: 'receiver id  required'
    },
    text: {
        type: String,
        required: 'message  required'
    },
    status: {
        type: String,
        default:'y'
    },
    isDeleted: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true

    }

);
