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
            message: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).json({
            status: "fail",
            message: "Please provide email and password",
        });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "Invalid Email or Password",
            });
        }

        // isMatch is found on every created document
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(404).json({
                status: "fail",
                message: "Invalid Email or Password",
            });
        }

        res.status(200).json({
            status: "success",
            token: `${Date.now()}`,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: `Error: ${err}`,
        });
    }
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password route");
};
