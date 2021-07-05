
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const TestResultSchema = new Schema({
    result: {
        type: Number,
        default: 0
    },
    test: {
        required: 'test Id required',
        type: Schema.Types.ObjectId,
        ref: "Tests"
    },
    subject: {
        required: 'Subject Id required',
        type: Schema.Types.ObjectId,
        ref: "Subjects"
    },
    student: {
        required: 'student Id required',
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
