
import { Document } from "mongoose"

export default interface IUser extends Document {
    name: String,
    username: String,
    password: String,
    mobile_no: String,
    role: String

}