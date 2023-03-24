const Contact = require("./contactModel");

async function getContacts(_id, page, limit, favorite) {
    const skip = (page - 1) * limit; 

    if (!favorite) {
      return await Contact.find({ owner: _id }, "", {
        skip: Number(skip),
        limit: Number(limit),
      }).select("-__v");
    }

    return await Contact.find({ owner: _id, favorite }, "", {
      skip: Number(skip),
      limit: Number(limit),
    }).select("-__v");
  }


async function getContactById(contactId, ) {
    const contact = await Contact.findById({_id: contactId});
    return contact;
}

async function removeContact(contactId) {
    const deletedContact = await Contact.findOneAndRemove({ _id: contactId});
    return deletedContact;
}

async function addContact({ name, email, phone, favorite,  _id}) {
    const newContact = await Contact.create({name, email, phone, favorite, owner: _id});
    await newContact.save();
    return newContact;
}

const updateContact = async (contactId, { name, email, phone, favorite}) => {
    const contactsUpdate = await Contact.findOneAndUpdate({_id: contactId}, { name, email, phone, favorite}, { new: true });
    return contactsUpdate;
};

const updateStatusContact = async (contactId, {favorite }) => {
    const contactsUpdate = await Contact.findOneAndUpdate(
      { _id: contactId },
      { favorite },
      { new: true }
    );
    return contactsUpdate;
  };

module.exports = {
    getContactById,
    getContacts,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}