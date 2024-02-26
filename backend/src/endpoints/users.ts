import express from 'express';
import User from '../models/user.js'

export const publicRouter = express.Router();
export const router = express.Router();

publicRouter.post("/", async (req, res) => {
    if (!req.body["username"] || !req.body["password"]) {
        return res.status(400).json({message: "Missing fields"});
    }
    const username = req.body["username"];
    if (await User.findOne({username: username})) {
        return res.status(400).json({message: "Username already in use"});
    }
    try {
        const user = await User.create({
            username: username,
            password: req.body["password"]
        });
        return res.location("/users/" + user._id).status(201).json({});
    } catch (e) {
        return res.status(400).json({});
    }
});


router.get("/", async (req, res) => {
    const filter: {verified?: boolean } = {};
    if (req.query["verified"]) {
        if (req.query.verified as string === "true") {
            filter.verified = true;
        } else if (req.query.verified as string === "false") {
            filter.verified = false;
        } else {
            return res.status(400).send({message: "'verified' must be true or false"});
        }
    }
    try {
        const users = await User.find(filter).select(["username", 'verified']);
        return res.json(users);
    } catch (e) {
        return res.status(400).json({message: "Something went wrong"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "Not found"});
        }
        return res.json(user);
    } catch (e) {
        return res.status(404).json({message: "Not found"});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "Not found"});
        }
    } catch (e) {
        return res.status(404).json({message: "Not found"});
    }
    const update: any = {};
    if (req.body["verified"]) {
        update.verified = req.body.verified;
    }
    try {
        await User.findByIdAndUpdate(req.params.id, update);
        return res.json({});
    } catch (e) {
        return res.status(400).json({});
    }
});