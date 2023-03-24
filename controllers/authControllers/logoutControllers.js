const { catchAsync } = require("../../helpers/catchAsync");
const User = require("../../models/userModel");


const logoutController = catchAsync(async(req, res, next) => {

    const {_id} = req.user;

    const user = await User.findByIdAndUpdate(_id, { token: null }, {new: true,});
    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized',
    })
    }
    res.status(204).json({message: `User ${_id} logout`});
})

module.exports = {
    logoutController,
}