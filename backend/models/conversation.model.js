import mongoose from "mongoose";

// make a schema
const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        }
    ]
}, {timestamps: true});

// create the model out of schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation