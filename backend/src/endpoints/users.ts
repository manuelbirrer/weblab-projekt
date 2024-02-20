import express from 'express';
import User from '../models/user'
import {eJwt} from "../ejwt";

export const router = express.Router();

router.get("/", eJwt, async (req, res) => {
    res.json(await User.find().select(["username", "verified"]));
});

router.post("/", async (req, res) => {
    if (!req.body["username"] || !req.body["password"]) {
        res.status(400);
        res.json({message: "Missing fields"});
        return;
    }
    const username = req.body["username"];
    if (await User.findOne({username: username})) {
        res.status(400);
        res.json({message: "Username in use"});
        return;
    }
    const user = await User.create({
        username: username,
        password: req.body["password"]
    });
    res.location("/users/" + user._id);
    res.status(201);
    res.json({});
});

router.get("/:id", eJwt, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
        return;
    } catch (e) {
        res.status(404);
        res.json({});
        return;
    }
});

router.put("/:id", eJwt, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("User not found");
        }
    } catch (e) {
        res.status(404);
        res.json({});
        return;
    }
    const update: any = {};
    if (req.body["verified"]) {
        update.verified = req.body.verified;
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, update);
        res.json({});
        return;
    } catch (e) {
        res.status(400);
        res.json({});
        return;
    }
});