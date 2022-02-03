const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET,JWT_EXP} = require("../../config/keys")
const passport = require ("passport");

const generateToken = (newUser) =>{
    const payload ={
        username: user.username,
        id: user.id,
        email: user.email,
        firstName: user.email,
        lastName: user.lastName,
        exp: Date.now()+ JWT_EXP
    };
    const token = jwt.sign(payload, JWT_SECRET);
    // res.status(201).json({message: "Successfully Created"});
    return token;
}

exports.signUp = async (req, res, next) =>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body,password = hashedPassword;
        const user= await User.create(req.body);
        const token = generateToken
        json({token: token});
    }
    catch(error){
        // next(error);
        return res.status(500).json({message: error.message});
    }
}

exports.signIn = async (req, res, next) =>{
    const token = generateToken(req.user);
    res.status(200).json({token: token});
}