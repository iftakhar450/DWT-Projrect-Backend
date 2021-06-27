
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: 'Username  required'
    },
    user_id: {
        type: String,
        unique: true,
        required: 'User id  required'
    },
    password: String,
    mobile_no: String,
    role: String,
    // id student
    class: {
        type: Schema.Types.ObjectId,
        ref: "Classes"
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
