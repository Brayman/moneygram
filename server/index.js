const express = require('express');
const cors  = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config()
const mongoose = require('mongoose');

const transactionRoutes = require('./routes/transactions-route')
const usersRoutes = require('./routes/users-routes');



const app = express();

const uri = process.env.MONGO_URI
 mongoose.connect(uri)
 .then(() => console.log('Connected to DB'))
 .catch(err => console.log(err))

app.use(cors());
app.use(cookieParser());
app.use(express.json())

app.use(transactionRoutes);
app.use(usersRoutes);


app.listen(3001, () => {
   console.log('listen port 3001');
})