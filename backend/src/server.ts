import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {expressjwt} from 'express-jwt';

import {router as mealsRouter} from "./endpoints/meals";
import {router as loginRouter} from "./endpoints/login";
import bodyParser from "body-parser";

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/weblab", {
        serverSelectionTimeoutMS: 5000,
        authSource: "admin",
        user: "root",
        pass: "pass"
    });
} catch (error) {
    console.log(error);
}

const eJwt = expressjwt({
    secret: "badsecret",
    algorithms: ["HS256"]
})

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.json({message: "Hello from the API"});
});

app.use("/login", loginRouter)
app.use("/meals", mealsRouter);

app.listen(3000);

console.log("Server started");