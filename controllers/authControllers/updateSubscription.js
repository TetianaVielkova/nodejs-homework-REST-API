const { catchAsync } = require('../../helpers/catchAsync');
const {updateSubscription} = require('../../models/users');


const updateSubscriptionController = catchAsync(async (req, res, next) => {
        const { email, subscription } = req.body;
        const user = await updateSubscription({email, subscription});

        if (subscription !== ["starter", "pro", "business"]) {
            return res.status(400).json({message: 'Choose one of the suggested options: starter, pro, business'});
        }
        res.status(200).json({user});
});

module.exports = {
    updateSubscriptionController,
}