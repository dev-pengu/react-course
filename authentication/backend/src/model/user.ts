import mongoose, { Schema } from 'mongoose';

export type UserDocument = {
    id: string;
    email: string;
    password: string;
};

const userSchema = new Schema<UserDocument>({
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;