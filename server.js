const express= require('express');
const { connectDB } = require('./config/db');
const app= express();
require('dotenv').config();

const port= process.env.PORT || 3000

app.use(express.json());

require('./config/db');

app.use('/api/users', require('./routes/user'));


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`); 
})