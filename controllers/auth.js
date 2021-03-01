const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        next(new ErrorResponse("Please provide email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            next(new ErrorResponse("Invalid Email or Password", 401));
        }

        // isMatch is found on every created document
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            next(new ErrorResponse("Invalid Email or Password", 400));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password route");
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        status: "success",
        token,
    });
};
