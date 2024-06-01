import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateTokens.js';

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password != confirmPassword){
            return res.status(400).json({error: 'Password doesn\'t match'});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: 'Username already exists'});
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName, username, password: hashedPassword, gender, 
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                message: "successfully signed up",
                data:{
                    _id: newUser.id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                }
            })
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Integer Server Error"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
    
        const user = await User.findOne({username});
    
        const matchedPassword = await bcrypt.compare(password, user?.password || "");
    
        if(!user || !matchedPassword){
            return res.status(400).json({error: "Invalid Credentials"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message: "successfully logged in",
            data: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            }
        });
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({error: "Internal Server error"});
    }
    
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "logged out successfully!"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({error: "Internal Server error"});
    }
    res.send("log out user");
}