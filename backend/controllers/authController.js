const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const handleError = (error) => {
    const errors = {email: '', password: ''}
    if(error.message == "Incorrect Email") {
        errors.email = "Incorrect Email";
    }
    if(error.message == "Incorrect Password") {
        errors.password = "Incorrect Password";
    }
    if(error.code === 11000) {
        errors.email = "Email Already Exist";
    }
    if(error.message.includes('users validation failed')) {
        const errorObject = Object.values(error.errors);
        errorObject.forEach((err) => {
           const {properties} = err;
           errors[properties.path] = properties.message;

        })
    }
    return errors;
}

const secret = process.env.SECRET_KEY;

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id},secret,{
        expiresIn: maxAge,
    } )
}

module.exports.signup_post =async  (req, res) => {
    const {email, password} = req.body;

    try {
        // const User = await User.create({email, password});
        const newUser = new User({email, password});
        const saveUser = await newUser.save();
        const token = createToken(saveUser._id);
        res.cookie('jwt', token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000});
        res.status(201).json({user: saveUser._id});

    }catch(error) {
        const err = handleError(error);
        res.status(400).json({error: err});
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }catch(error) {
        const err = handleError(error);
        res.status(400).json({error: err})
    }
}

module.exports.forgot_post = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email});
    
    if(!user) {
        res.json({error: "User not found"})
    }

    const resetToken = user.createResetPasswordToken(user);

    const u = await user.save({validateBeforeSave: false});
   
    const resetUrl = `http://localhost:5000/reset_password/${resetToken}`;

    const message = `We recieve a password reset request please use the below link to reset your password\n\n${resetUrl}`

    //req.protocol://req.get('host)/api/v1/users/reset_password
    try {
        await sendEmail({
            email: user.email,
            subject: "Password change request",
            message: message,
        });
        res.status(200).json({
            status: "success",
            msg: "password reset link send to the user email"
        })
    }
    catch(err) {
        user.passwordResetToken = undefined,
        user.passwordResetTokenExpires = undefined,
        user.save();
        //
        res.json({
            error:"Internal Server Error",
            msg: "Failed to send REset password email"
        });
    }
   
}

module.exports.reset_password = async (req, res) => {

    //If the user exist with the give token and token has not expired
    const token = crypto.createHash('sha256').update(req.params.token).digest("hex");
    const user = await User.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}});
    if(!user) {
        res.json({error: "User is invalid or has expired"});
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    //user.passwordChangeAt = Date.now();

    await user.save();

    //token and send status;

    res.json({user: user._id});
}

module.exports.logout_get = async (req, res) => {
    res.cookie("jwt", "", {maxAge: 1, httpOnly: true, secure: true});
    // res.clearCookie('jwt');
    res.json("hel logout");
}