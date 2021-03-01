const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Run pre middleware before saving user
// function is used to have access to this
UserSchema.pre("save", async function (next) {
    // this point to current document to be saved

    // do not encrpyt if sent password already exist in DB
    if (!this.isModified("password")) {
        next();
    }

    // hash takes in some text and a saltRound number to generate a salt and returns a harshed string
    // The higher the salt round the better the hashing process but uses more cpu resources
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Signing a JWT
// This requires a payload and a secret
// The payload has to uniquely identity a given object in the database
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
