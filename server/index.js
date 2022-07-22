const express = require('express');
const cors  = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config()
const mongoose = require('mongoose');

const transactionRoutes = require('./routes/transactions-route')
const usersRoutes = require('./routes/users-routes');
const walletsRoutes = require('./routes/wallets-route');



const app = express();

const uri = process.env.MONGO_URI
mongoose.connect(uri)
 .then(() => console.log('Connected to DB'))
 .catch(err => console.log(err))

app.use(express.json())
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: 'http://localhost:3000'
}));



app.use(transactionRoutes);
app.use(usersRoutes);
app.use(walletsRoutes)


app.listen(5000, () => {
   console.log('listen port 5000');
})