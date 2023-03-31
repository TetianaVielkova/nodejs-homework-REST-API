const { catchAsync } = require("../../helpers/catchAsync");
const { schemaUser } = require("../../helpers/validations");
const User = require("../../models/userModel");
const gravatar = require('gravatar');


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
        const avatarURL = gravatar.url(email, {s: '100', r: 'x', d: 'identicon'}, true);
        const newUser = new User({ email, password, avatarURL });
        newUser.setPassword(password);
        console.log(newUser);
        
        await newUser.save();
    
        res.status(201).json({
            "user" : {
                "email": `${newUser.email}`,
                "avatarURL": `${newUser.avatarURL}`,
                "subscription": "starter",
            }
        })
})

module.exports = {
    registerController,
};