const { catchAsync } = require('../../helpers/catchAsync');
const { removeContact } = require('../../models/contacts');


const deleteContact = catchAsync(async (req, res) => {
        const { contactId } = req.params;
        const { _id } = req.user;
        await removeContact({_id: contactId}, _id)
        res.status(200).json(`Contact ${contactId} deleted`);
});

module.exports = {
    deleteContact,
};