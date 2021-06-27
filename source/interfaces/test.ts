
import { Document } from "mongoose"

export default interface ITest extends Document {
    name: String,
    date: Date,
    teacher: String,
    subject: String,
    status: String,
    class: String,


}