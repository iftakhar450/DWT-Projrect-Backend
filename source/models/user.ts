
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: 'Username  required'
    },
    password: String,
    mobile_no: String,
    role: String,
    isDeleted: {
        type: Number,
        default: 0

    }
},
    {
        timestamps: true

    }

);
