import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";

import { v4 as uuid } from 'uuid';

import cors from "cors";

import DefaultData from "./default.js";

import  connection  from "./database/db.js";

import Routes from "./routes/route.js";


const app=express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.use('/', Routes);

const PORT =process.env.PORT|| 8000


const username=process.env.DB_USERNAME
const password=process.env.DB_PASSWORD

const URL = process.env.MONGODB_URL || `mongodb+srv://${username}:${password}@abhimongo.o5iq8su.mongodb.net/EcomerceDB`

connection(URL);

app.listen( PORT ,()=>{
    console.log("server is running on port 8000");
})

DefaultData();