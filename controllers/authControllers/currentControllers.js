const { catchAsync } = require("../../helpers/catchAsync");
const User = require("../../models/userModel");

const currentController = catchAsync(async (req, res) => {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized',
    })
    }
    const { email, subscription } = user;

    return res.status(200).json({
        email,
        subscription,
        _id
    });
})

module.exports = {
    currentController,
}