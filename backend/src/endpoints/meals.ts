import express from "express";
import {Request as JWTRequest} from "express-jwt";
import Meal from "../models/meal";

export const router = express.Router();

router.get("/", async (req, res) => {
    const filter: { date?: { $gte?: Date, $lte?: Date } } = {};

    if (req.query["from"]) {
        const fromDate = new Date(req.query.from as string);
        if (isNaN(fromDate.valueOf())) {
            return res.status(400).send({status: 400, message: "'from' is not a valid date"});
        }
        if (!filter['date']) filter.date = {};
        filter.date.$gte = fromDate
    }

    if (req.query["to"]) {
        const toDate = new Date(req.query.to as string);
        if (isNaN(toDate.valueOf())) {
            return res.status(400).send({status: 400, message: "'to' is not a valid date"});
        }
        if (!filter['date']) filter.date = {};
        filter.date.$lte = toDate
    }
    return res.json(await Meal.find(filter));
});

router.post("/", async (req: JWTRequest, res) => {
    const newMeal = req.body;
    newMeal.createdBy = req.auth?.user;
    newMeal.modifiedBy = req.auth?.user;
    try {
        const meal = await Meal.create(newMeal);
        return res.json({id: meal._id});
    } catch (e) {
        return res.status(400).json({message: "Something went wrong"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({message: "Not found"});
        }
        return res.json(meal);
    } catch (e) {
        return res.status(404).json({message: "Not found"});
    }
});

router.put("/:id", async (req: JWTRequest, res) => {
    const update = req.body;
    update.updatedBy = req.auth?.user;
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({message: "Not found"});
        }
        Object.assign(meal, update);
        await meal.save();
        return res.json({});
    } catch (e) {
        return res.status(400).json({message: "Something went wrong"});
    }
});

router.post("/:id/guests", async (req, res) => {
    if (!req.body["guest"]) {
        return res.status(400).json({ status: 400, message: "No guest specified"});
    }
    try {
        await Meal.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {guests: req.body.guest}}
        );
        return res.json({});
    } catch (e) {
        return res.status(400).json({});
    }
});

router.delete("/:id/guests/:guestId", async (req, res) => {
    try {
        await Meal.findByIdAndUpdate(
            req.params.id,
            {$pull: {guests: req.params.guestId}}
        );
        return res.json({});
    } catch (e) {
        return res.status(400).json({});
    }
});
