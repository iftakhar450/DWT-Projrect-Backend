
import { Document } from "mongoose"

export default interface ITestResult extends Document {
    test: String,
    result: String,
    student: String,
    subject: String


}