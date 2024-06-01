import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    // create a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // in ms
        httpOnly: true, //prevent xss attacks, cross-site scripting attacks
        sameSite: "strict", //CSRF attacks, cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'DEVELOPEMENT'
    })
}

export default generateTokenAndSetCookie;