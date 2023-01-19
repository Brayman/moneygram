import express, { Express, Request, Response } from "express";
const cors  = require('cors');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const  passport = require('passport');
import dotenv from 'dotenv';
const mongoose = require('mongoose');

import router from "./routes/transactions-route";

const usersRoutes = require('./routes/users-routes');
const walletsRoutes = require('./routes/wallets-route');

dotenv.config();


const app: Express = express();

const uri = process.env.MONGO_URI
mongoose.connect(uri)
 .then(() => console.log('Connected to DB'))
 .catch((err: any) => console.error(err))

app.use(express.json())
app.use(cookieParser());
app.use(cookieSession({
   name: 'session',
   keys: ['megauser'],
   maxAge: 24 * 60 * 60 * 100
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
   credentials: true,
   origin: ['http://localhost:3000','https://github.com']
}));



app.use(router);
app.use(usersRoutes);
app.use(walletsRoutes)


app.listen(5000, () => {
   console.log('listen port 5000');
})