import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        // extract the token from the cookies
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorized - No Token Provided"});
        }

        // decode and verify the current json web token using JWT_SECRET key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(token, decoded);
        
        // decoded token has userId, initiate and expire time
        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
        }

        const id = decoded.userId;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({error: "User Not Found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error in protect route middleware", error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export default protectRoute;