import { getJwtPayload } from '../utils/jwt.js';

const validateTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    const { payload, success } = getJwtPayload(token);

    if (success) {
        req.user = payload;
        next();
    } else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export { validateTokenMiddleware };
