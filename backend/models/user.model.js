import mongoose from "mongoose";

// make the user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    gender: {
        type: String, 
        required: true,
        enum: ["male","female"]
    },
    profilePic: {
        type: String, 
        default: "",
    }
}, {timeStamp: true});

// make a model on the basis of above schema
const User = mongoose.model("User", userSchema);
export default User; 