import express from "express";
import jwt from "jsonwebtoken";

export const router = express.Router();

router.post("/", (req, res) => {
    if (!req.body["user"] || !req.body["pass"]) {
        res.status(401);
        res.json({message: "Unauthorized"});
        return;
    }
    if (req.body["user"] !== "admin" && req.body["pass"] !== "pass") {
        res.status(401);
        res.json({message: "Unauthorized"});
        return;
    }
    const token = jwt.sign({user: "admin"}, "badsecret");
    res.json({token: token});
});