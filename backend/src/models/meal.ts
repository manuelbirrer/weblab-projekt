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
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true});

export default model('Meal', schema);