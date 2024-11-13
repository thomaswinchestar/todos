// src/store/features/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

const initialState = {
    todos: [] as Todo[]
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        }
    }
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;