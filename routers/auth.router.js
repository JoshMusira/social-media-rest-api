import { Router } from "express";
import User from '../models/user.model.js'
import bcryt from 'bcrypt'

export const authRouter = Router();

//REGISTER USER
authRouter.post("/auth/register", async (req, res) => {

    try {
        const salt = await bcryt.genSalt(10);
        const hashedPassword = await bcryt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });


        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
    }

});

//LOGIN USER

authRouter.post("/auth/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found");

    } catch (error) {
        console.log(error)
    }
})