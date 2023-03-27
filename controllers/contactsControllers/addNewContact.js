const { schemaContact } = require('../../helpers/validations');
const { catchAsync } = require('../../helpers/catchAsync');
const { addContact } = require('../../models/contacts');

const addNewContact = catchAsync(async (req, res) => {
        const {error} = schemaContact.validate(req.body);
        if(error) {
            return res.status(400).json({error});
        }
        const { _id } = req.user;
        const { name, email, phone, favorite } = req.body;
        
        const newContact = await addContact({name, email, phone, favorite, _id});

        res.status(201).json(newContact);
});

module.exports = {
    addNewContact,
};