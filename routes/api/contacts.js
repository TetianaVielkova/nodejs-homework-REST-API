const express = require('express');

const {deleteContact} = require('../../controllers/contactsControllers/deleteContact');
const {getContactsList} = require('../../controllers/contactsControllers/getContactsList');
const {addNewContact} = require('../../controllers/contactsControllers/addNewContact');
const {getContactId} = require('../../controllers/contactsControllers/getContactId');
const {updateContactById} = require('../../controllers/contactsControllers/updateContactById');
const {updateStatus} = require('../../controllers/contactsControllers/updateStatus');
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get('/', getContactsList)

router.get('/:contactId', getContactId)

router.post('/', addNewContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContactById)

router.patch('/:contactId/favorite', updateStatus)

module.exports = router;

