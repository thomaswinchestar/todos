"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Todo_1 = require("./models/Todo");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB connection
mongoose_1.default.connect('mongodb://localhost:27017/todo_app')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo_1.Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});
app.post('/api/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo_1.Todo({ title, description });
        await todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating todo' });
    }
});
// @ts-ignore
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo_1.Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating todo' });
    }
});
// @ts-ignore
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo_1.Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting todo' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
