// src/models/Todo.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ITodo } from '../types/todo';

export interface ITodoDocument extends Omit<ITodo, '_id'>, Document {}

const todoSchema = new Schema<ITodoDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const Todo = mongoose.model<ITodoDocument>('Todo', todoSchema);