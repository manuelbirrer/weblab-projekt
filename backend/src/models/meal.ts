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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    note: {
        type: String
    },
    guests: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true});

export default model('Meal', schema);