import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId} = req.params;
        const senderId  = req.user._id;
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            participants : { $all: [senderId, receiverId]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId], //message: []
            });
        }

        const newMessage = await Message.create({
            senderId, receiverId, message 
        });

        if(newMessage){
            conversation.message.push(newMessage._id);
        }

        newMessage.save();
        conversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            // to send events to a specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToSendId} = req.params;
        const userLoggedIn = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [userLoggedIn, userToSendId]},
        }).populate("message");     // we will get all the messages not the reference ids

        if(!conversation){
            return res.status(200).json([]);
        }
        // console.log(conversation);

        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}