
import { Document } from "mongoose"

export default interface ISubject extends Document {
    title: String,
    s_id: String,
    teacher: String,
    class: String,


}