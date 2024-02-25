import express from 'express';
import User from '../models/user'

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
    return res.json(await User.find().select(["username", "verified"]));
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