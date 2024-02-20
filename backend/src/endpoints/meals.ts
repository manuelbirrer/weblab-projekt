import express from "express";
import Meal from "../models/meal";

export const router = express.Router();

router.get("/", async (req, res) => {
    const filter: { date?: { $gte?: Date, $lte?: Date } } = {};

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

router.post("/", async (req, res) => {
    try {
        await Meal.create(req.body)
        res.json({});
        return;
    } catch (e) {
        res.status(400);
        res.json({});
        return;
    }
})

router.get("/:id", async (req, res) => {
    res.json(await Meal.findById(req.params.id));
});

router.post("/:id/guests", async (req, res) => {
    if (!req.body["guest"]) {
        res.status(400);
        res.json({ status: 400, message: "No guest specified"});
        return;
    }
    try {
        await Meal.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {guests: req.body.guest}}
        );
        res.json({});
        return;
    } catch (e) {
        res.status(400);
        res.json({});
        return;
    }
});

router.delete("/:id/guests/:guestId", async (req, res) => {
    try {
        await Meal.findByIdAndUpdate(
            req.params.id,
            {$pull: {guests: req.params.guestId}}
        );
        res.json({});
        return;
    } catch (e) {
        res.status(400);
        res.json({});
        return;
    }
});
