const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

const signUp = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age
    });

    res.status(201).json({ message: 'User signed up successfully', user: newUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login= async(req, res)=>{
    try {
        const {email, password}= req.body;
        
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const userExist= await User.findOne({where: {email}});
        if(!userExist){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token= jwt.sign({id: userExist.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'User login successful', token});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const getAllUsers= async(req, res)=>{
    try {
        const users= await User.findAll();
        res.status(200).json({message: 'users fetched successfully', data:users});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, age } = req.body;

         // Ensure the user can only update their own account
        if(req.user.id != id){
            return res.status(403).json({message: 'You are not authorized to update this user.'});
        }

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) {
            const userExist = await User.findOne({ where: { email } });
            if (userExist && userExist.id !== user.id) {
                return res.status(409).json({ message: 'This email is already taken by another user' });
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (age) user.age = age;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser= async(req, res)=>{
    try {
        const {id}= req.params;

        // Ensure the user can only update their own account
        if(req.user.id != id){
            return res.status(403).json({message: 'You are not authorized to update this user.'});
        }

        const deleteUser= await User.findOne({where: {id}});
        if(!deleteUser){
            return res.status(404).json({message: 'User not found'});
        }

        await deleteUser.destroy();
        res.status(200).json({message: 'User deleted successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = { signUp, login, getAllUsers, updateUser, deleteUser };