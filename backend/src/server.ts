import dotenv from "dotenv";
import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from "morgan";
import {expressjwt} from "express-jwt";

import {router as loginRouter} from "./endpoints/login.js";
import {router as mealsRouter} from "./endpoints/meals.js";
import {router as usersRouter, publicRouter as publicUsersRouter} from "./endpoints/users.js";

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET, JWT_EXPIRES_IN_SECONDS, CORS_ORIGIN } = process.env;

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD || !JWT_SECRET || !JWT_EXPIRES_IN_SECONDS || !CORS_ORIGIN) {
    console.error("One ore more env vars not set");
    process.exit(1);
}

try {
    await mongoose.connect(`${DB_HOST}/${DB_NAME}`, {
        serverSelectionTimeoutMS: 5000,
        authSource: "admin",
        user: DB_USER,
        pass: DB_PASSWORD
    });
} catch (error) {
    console.log(error);
}

const eJwt = expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"]
})

const app = express();

app.use(cors({
    origin: CORS_ORIGIN
}));

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.get("/", async (req, res) => {
    res.json({message: "Hello from the API"});
});

app.use("/login", loginRouter)
app.use("/meals", eJwt, mealsRouter);
app.use("/users", publicUsersRouter);
app.use("/users", eJwt, usersRouter);

app.listen(3000);

console.log("Server started");