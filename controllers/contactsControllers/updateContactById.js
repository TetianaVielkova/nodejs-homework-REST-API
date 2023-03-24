const { schemaContact } = require('../../helpers/validations');
const { catchAsync } = require('../../helpers/catchAsync');
const { updateContact } = require('../../models/contacts');

const updateContactById = catchAsync(async (req, res) => {
        const validationResult = schemaContact.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json("missing fields");
        }
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const { name, email, phone, favorite} = req.body;
        const contactUpdate = await updateContact({_id: contactId}, {name, email, phone, favorite}, owner, { new: true })
        res.status(200).json(contactUpdate);
});

module.exports = {
    updateContactById,
};

