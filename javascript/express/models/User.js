import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        indexedDB: true,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const User = model('User', UserSchema);
User.createCollection();

export { User, UserSchema };
