exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Access Granted",
    });
};
