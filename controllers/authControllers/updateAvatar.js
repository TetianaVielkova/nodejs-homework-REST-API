const { updateAvatar } = require("../../models/users");

const updateAvatarController = async (req, res, next) => {
    const { _id } = req.user;
    // console.log(req.file);
    const { path: tempUpload, originalname } = req.file;
    try{
        const avatarURL = await updateAvatar(_id, {
            tempUpload,
            originalname,
        });
        return res.status(200).json({ avatarURL });
    }catch  {
        return res.status(401).json({
            status: 'error',
            data: 'Unauthorized',
        })
    }
}

module.exports = {
    updateAvatarController,
}