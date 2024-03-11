import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generateToken } from '../utils/jwt.js';

dotenv.config();

const createUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password and username are required' });
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email, password: hashedPassword, username });

        return res.status(201).json({ message: `User ${username} created` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User or password are not valid' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'User or password are not valid' });
        }

        const token = generateToken(user);

        return res.status(200).json({ message: 'Successfuly loged in', token });
    } catch {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, _id, ...userWithoutSensitiveData } = user.toObject();
        return res.status(200).json({ user: userWithoutSensitiveData, message: 'User found' });
    } catch {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export { createUser, getUser, login };
