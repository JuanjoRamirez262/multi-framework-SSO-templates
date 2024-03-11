import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await connect(databaseUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export { connectToDatabase };
