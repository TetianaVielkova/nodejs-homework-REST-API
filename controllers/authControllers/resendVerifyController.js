const { catchAsync } = require("../../helpers/catchAsync");
const { sendEmail } = require("../../helpers/sendEmails");
const { schemaEmail } = require("../../helpers/validations");
const User = require("../../models/userModel");

const resendVerifyController = catchAsync(async(req, res) => {
    const {error} = schemaEmail.validate(req.body);
    if(error) {
        return res.status(400).json({error : error.details[0].message});
    }

    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message: 'User not found',
    })}
    if(user.verify){
        return res.status(401).json({
            message: 'User already verified',
    })
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Click varify email</a>`
    }

    await sendEmail(verifyEmail);

    return res.status(200).json({
        message: 'Verification email sent',
})
})


module.exports = {
    resendVerifyController,
}