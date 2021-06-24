
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const SubjectSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: 'Subject name required'
    },
    s_id: {
        type: String,
        unique: true,
        required: 'Subject Id required'
    },
    class: {
        required: 'Class Id required',
        type: Schema.Types.ObjectId,
        ref: "Classes"
    },
    teacher: {
        required: 'Teacher Id required',
        type: Schema.Types.ObjectId,
        ref: "Users"
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
