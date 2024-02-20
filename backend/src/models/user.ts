import {Schema, model, Model} from 'mongoose';
import bcrypt from "bcrypt";

interface IUser {
    username: string;
    password: string;
    verified?: boolean;
}

interface IUserMethods {
    validatePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>

const schema = new Schema<IUser, UserModel, IUserMethods>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

schema.method("validatePassword", async function (password: string) {
    return bcrypt.compare(password, this.password);
});

schema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

export default model<IUser, UserModel>('User', schema);