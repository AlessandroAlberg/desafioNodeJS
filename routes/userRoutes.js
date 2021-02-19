const express = require('express');
const user = require('../controller/userController');

const router = express.Router();

router.route('/').get(user.getUsers);
router.route('/:id').get(user.getUser);
router.route('/').post(user.postUser);
router.route('/').put(user.putUser);
router.route('/updates').put(user.putUsers);
router.route('/:id').delete(user.deleteUser);
router.route('/destroy').put(user.destroyUsers);

module.exports = router;