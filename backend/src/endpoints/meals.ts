import express from "express";
import Meal from "../models/meal";

export const router = express.Router();

router.get("/", async (req, res) => {
    console.log(req.auth);
    const filter: {date?: {$gte?: Date, $lte?: Date}} = {};

    if (req.query["from"]) {
        const fromDate = new Date(req.query.from as string);
        if (isNaN(fromDate.valueOf())) {
            res.status(400);
            res.send({status: 400, message: "'from' is not a valid date"});
            return;
        }
        if (!filter['date']) filter.date = {};
        filter.date.$gte = fromDate
    }

    if (req.query["to"]) {
        const toDate = new Date(req.query.to as string);
        if (isNaN(toDate.valueOf())) {
            res.status(400);
            res.send({status: 400, message: "'to' is not a valid date"});
            return;
        }
        if (!filter['date']) filter.date = {};
        filter.date.$lte = toDate
    }
    res.json(await Meal.find(filter));
});

router.get("/:id", async (req, res) => {
    res.json(await Meal.findOne({_id: req.params.id}));
});

router.put("/meals/hardcoded", async (req, res) => {
    await Meal.create({
        date: new Date("2024-02-13T18:00"),
        recipe: "asdf",
        cook: "me"
    })
    res.json({})
});