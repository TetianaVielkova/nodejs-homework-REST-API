const User = require("./userModel");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateSubscription = async ({ email, subscription }) => {
    return await User.findOneAndUpdate(email, { subscription: subscription }, { new: true });
};

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (_id, { tempUpload, originalname }) => {
    const avatarName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const avatar = await Jimp.read(resultUpload);
    await avatar.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(resultUpload);

    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    return avatarURL;
};

module.exports = {
    updateSubscription,
    updateAvatar
}