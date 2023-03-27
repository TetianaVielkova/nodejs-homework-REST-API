const User = require("./userModel");

const updateSubscription = async ({ email, subscription }) => {
    return await User.findOneAndUpdate(email, { subscription: subscription }, { new: true });
};


module.exports = {
    updateSubscription,
}