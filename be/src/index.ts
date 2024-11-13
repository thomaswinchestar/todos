// src/index.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import todoRoutes from './routes/todo.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});