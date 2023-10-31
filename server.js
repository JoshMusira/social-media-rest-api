import express from 'express'
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { homeRouter } from './routers/user.router.js';
import { authRouter } from './routers/auth.router.js';
import { startServer } from './boot/boot.js';

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
app.use(helmet());
app.use(morgan("common"));

app.use('/', homeRouter)
app.use('/api', homeRouter)
app.use('/api', authRouter)

startServer(app);