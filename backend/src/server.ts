import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import {eJwt} from "./ejwt";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

import {router as loginRouter} from "./endpoints/login";
import {router as mealsRouter} from "./endpoints/meals";
import {router as usersRouter} from "./endpoints/users";

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

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.get("/", async (req, res) => {
    res.json({message: "Hello from the API"});
});

app.use("/login", loginRouter)
app.use("/meals", eJwt, mealsRouter);
app.use("/users", usersRouter);

app.listen(3000);

console.log("Server started");