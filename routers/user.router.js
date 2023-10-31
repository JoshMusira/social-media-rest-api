import { Router } from "express";
import { deleteUser, followUser, getUser, unfollowUser, updateUser } from "../controllers/user.controller.js";

export const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.send("Welcome to Social media rest api !");
});

homeRouter.patch("/users/:id", updateUser);
homeRouter.delete("/users/:id", deleteUser);
homeRouter.get("/users/:id", getUser);
homeRouter.patch("/users/:id/follow", followUser);
homeRouter.patch("/users/:id/unfollow", unfollowUser);
