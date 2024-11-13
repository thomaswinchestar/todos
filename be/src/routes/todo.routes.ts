// src/routes/todo.routes.ts
import { Router, Request, Response } from 'express';
import { Todo } from '../models/Todo';

const router = Router();

interface TodoRequest {
    title: string;
    description: string;
}

// Get all todos
router.get('/', async (_req: Request, res: Response) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// Create todo
router.post('/', async (req: Request<{}, {}, TodoRequest>, res: Response) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating todo' });
    }
});

// Update todo
// @ts-ignore
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating todo' });
    }
});

// Delete todo
// @ts-ignore
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting todo' });
    }
});

export default router;