const { catchAsync } = require('../../helpers/catchAsync');
const { getContacts } = require('../../models/contacts');

const getContactsList = catchAsync(async (req, res) => {
    const {_id}=req.user;
    const { page = 1, limit = 20, favorite} = req.query;

    const contacts = await getContacts(_id, page, limit, favorite)
    res.status(200).json({contacts, page, limit});
});

module.exports = {
    getContactsList,
};
