import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.body["username"] || !req.body["password"]) {
        return res.status(401).json({"code": "INVALID_INPUT", message: "Missing fields"});
    }
    const username = req.body["username"];
    const password = req.body["password"];
    const user = await User.findOne({username: username});
    if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({code: "INVALID_LOGIN", message: "User doesn't exist or password is incorrect"});
    }
    if (!user.verified) {
        return res.status(401).json({code: "UNVERIFIED_USER", message: "Not verified yet"});
    }
    const expiresInSeconds = Number(process.env.JWT_EXPIRES_IN_SECONDS);
    const expiresAtSeconds = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const token = jwt.sign({exp: expiresAtSeconds, user: user._id}, process.env.JWT_SECRET as string);
    return res.json({jwt: { access_token: token, expires_at: expiresAtSeconds * 1000, user_id: user._id } });
});