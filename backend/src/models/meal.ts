import {Schema, model} from 'mongoose';

const schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    cook: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
}, {timestamps: true});

export default model('Meal', schema);