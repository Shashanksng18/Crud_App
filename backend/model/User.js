const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        validate: [isEmail, 'please enter a valid email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'please enter atlease 6 digit password'],
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpires: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
})

userSchema.statics.login =async  function(email, password){
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt();
    console.log(this.password)
    this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log(resetToken)

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('users', userSchema);



module.exports = User;