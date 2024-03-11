import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return token;
};

const getJwtPayload = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return { payload, success: true };
    } catch {
        return { payload: null, success: false };
    }
};

export { generateToken, getJwtPayload };
