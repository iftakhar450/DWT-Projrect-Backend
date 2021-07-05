
import { Document } from "mongoose"

export default interface IChat extends Document {
    sender: String,
    receiver: String,
    text: String,

}