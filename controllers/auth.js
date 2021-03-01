const User = require("../models/User");

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.login = (req, res, next) => {
    res.send("Login route");
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password route");
};
