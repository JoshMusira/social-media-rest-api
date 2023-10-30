import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'

dotenv.config();
const port = process.env.PORT || 5000

connectDB();

const app = express();

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
)

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to Social media rest api !!!!");
});


app.listen(port, () =>
    console.log(`Backend running on port ${port}`)
)