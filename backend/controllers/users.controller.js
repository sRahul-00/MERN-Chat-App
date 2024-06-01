import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        // console.log(req.user);
        const userLoggedIn = req.user._id;
        console.log(req.user._id);

        // find all the users expect the very one that logged in
        const filteredUsers = await User.find({ _id: { $ne: userLoggedIn}});
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in users controller:", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}