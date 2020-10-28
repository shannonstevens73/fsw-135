const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user:
{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
}})

module.exports = mongoose.model("User", userSchema)