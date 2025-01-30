const express= require('express');
const { signUp, login, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const router= express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports= router;