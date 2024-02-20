import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.body["username"] || !req.body["password"]) {
        res.status(401);
        res.json({message: "Unauthorized"});
        return;
    }
    const username = req.body["username"];
    const password = req.body["password"];
    const user = await User.findOne({username: username});
    if (!user || !(await user.validatePassword(password))) {
        res.status(401);
        res.json({message: "Unauthorized"});
        return;
    }
    if (!user.verified) {
        res.status(401);
        res.json({message: "Not verified yet"});
        return;
    }
    const expiresInSeconds = Number(process.env.JWT_EXPIRES_IN_SECONDS);
    const expiresAtSeconds = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const token = jwt.sign({exp: expiresAtSeconds, user: user.username}, process.env.JWT_SECRET as string);
    res.json({jwt: { access_token: token, expires_at: expiresAtSeconds * 1000 } });
});