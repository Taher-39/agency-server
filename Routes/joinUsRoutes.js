const express = require('express');
const router = express.Router();
const joinUsController = require('../controllers/joinUsController');

router.post('/join-us/:id', joinUsController.postMember);

router.get('/get-all-members', joinUsController.getMembers);
router.patch('/update-status/:id', joinUsController.updateMemberStatus);
router.patch('/edit-member/:id', joinUsController.editJoinUsForm);
router.delete('/withdraw-member/:id', joinUsController.withdrawMember);
module.exports = router;