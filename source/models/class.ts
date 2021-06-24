
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const ClassSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name  required'
    },
    // class_id: {
    //     type: String,
    //     unique: true,
    // },
    isDeleted: {
        type: Number,
        default: 0

    }
},
    {
        timestamps: true

    }

);
