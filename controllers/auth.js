exports.register = (req, res, next) => {
    res.send("Register route");
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
