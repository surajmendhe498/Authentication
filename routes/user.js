const express= require('express');
const { signUp, login, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const router= express.Router();
const authenticate= require('../middleware/auth.middleware');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update/:id', authenticate, updateUser);
router.delete('/delete/:id', authenticate, deleteUser);


module.exports= router;