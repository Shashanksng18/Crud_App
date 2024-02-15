const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

const api_url = process.env.API_URL

const secret = process.env.SECRET_KEY;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secret , async (err, decodedToken) => {
            if(err) {
                res.redirect(`${api_url}/signup`)
            }else {
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        })
    }
    else {
        res.redirect(`${api_url}/signup`);
        next();
    }
}

const authRole = (req, res, next)  =>{
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if(err) {
                res.status(404).json({err:"Permission Denied"});
                next();
            }else {
                console.log(decodedToken)
                const user = await User.findById(decodedToken.id);
                req.role = user.role
                next();
            }
        })
    }else {
        res.status(401).json({ err: "Unauthorized access" });
    }
}

const userRole = (role) => {
    return (req, res, next) => {
       if(req.role !== role) {
         res.status(401)
         return res.status(500).json({err: "Not Allowed"})
       }
       next();
    }
}


module.exports = {requireAuth, authRole, userRole};