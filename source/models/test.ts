
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const TestSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Subject name required'
    },
    date: {
        type: Date,
        required: 'date is required'
    },
    status: {
        type: String,
        default: 'Created'
    },
    subject: {
        required: 'Subject Id required',
        type: Schema.Types.ObjectId,
        ref: "Subjects"
    },
    // class: {
    //     required: 'Class Id required',
    //     type: Schema.Types.ObjectId,
    //     ref: "Classes"
    // },
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
