import { Router } from "express";

export const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.send("Welcome to Social media rest api !");
});

homeRouter.get("/users", (req, res) => {
    res.send("Welcome to Social media users !");
});
