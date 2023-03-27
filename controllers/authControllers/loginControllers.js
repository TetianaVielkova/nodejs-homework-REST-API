const { catchAsync } = require("../../helpers/catchAsync");
const jwt = require('jsonwebtoken');
const User = require("../../models/userModel");
const { schemaUser } = require("../../helpers/validations");
require('dotenv').config();
const secret = process.env.SECRET;


const loginController = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const {error} = schemaUser.validate(req.body);
        if(error) {
            return res.status(400).json({error : error.details[0].message});
        }

    const user = await User.findOne({ email })

    if (!user || !user.validPassword(password)) {
        return res.status(401).json({
            status: 'error',
            code: 400,
            "message": "Email or password is wrong",
            data: 'Unauthorized',
        })
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
            payload,
            "user": {
                "email": `${user.email}`,
                "subscription": "starter"
            }
        },
    })
})

module.exports = {
    loginController,
};