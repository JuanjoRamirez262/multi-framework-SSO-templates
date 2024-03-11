import dotenv from 'dotenv';
import express from 'express';
import router from './router/index.js';
import { connectToDatabase } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

async function startServer() {
    try {
        // Connect to MongoDB
        await connectToDatabase();
        // Start the server
        app.listen(PORT, () => {
            // Log the port number where server is running
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
