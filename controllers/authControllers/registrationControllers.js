const { catchAsync } = require("../../helpers/catchAsync");
const { schemaUser } = require("../../helpers/validations");
const User = require("../../models/userModel")

const registerController = catchAsync(async(req, res, next) => {
    const { email, password } = req.body
    const {error} = schemaUser.validate(req.body);
        if(error) {
            return res.status(400).json({error : error.details[0].message});
        }
    const user = await User.findOne({ email })
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email in use',
            data: 'Conflict',
    })
    }
    try {
        const newUser = new User({ email })
        newUser.setPassword(password)
        await newUser.save()
        res.status(201).json({
            "user" : {
                "email": `${newUser.email}`,
                "subscription": "starter"
            }
        })
    } catch (error) {
        next(error)
    }
})

module.exports = {
    registerController,
};