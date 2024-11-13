// src/store/api/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface CreateTodoRequest {
    title: string;
    description: string;
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => '/todos',
            providesTags: ['Todo'],
        }),
        createTodo: builder.mutation<Todo, CreateTodoRequest>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, '_id'>>({
            query: ({ _id, ...patch }) => ({
                url: `/todos/${_id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation<void, string>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todoApi;