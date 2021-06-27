
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const ClassSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name  required'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    isDeleted: {
        type: Number,
        default: 0

    }
},
    {
        timestamps: true

    }

);
