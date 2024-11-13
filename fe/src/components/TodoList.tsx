// src/components/TodoList.tsx
'use client'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from '@/store/api/todoApi';

interface TodoFormData {
    title: string;
    description: string;
}

export default function TodoList() {
    const { register, handleSubmit, reset } = useForm<TodoFormData>();
    const { data: todos, isLoading } = useGetTodosQuery();
    const [createTodo] = useCreateTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const onSubmit = async (data: TodoFormData) => {
        await createTodo(data);
        reset();
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
                <Input {...register('title')} placeholder="Todo title" />
                <Textarea {...register('description')} placeholder="Todo description" />
                <Button type="submit">Add Todo</Button>
            </form>

            <div className="space-y-4">
                {todos?.map((todo) => (
                    <Card key={todo._id}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={todo.completed}
                                        onCheckedChange={(checked) =>
                                            updateTodo({ _id: todo._id, completed: !!checked })
                                        }
                                    />
                                    <div className={todo.completed ? 'line-through' : ''}>
                                        <h3 className="font-medium">{todo.title}</h3>
                                        <p className="text-sm text-gray-500">{todo.description}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={() => deleteTodo(todo._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}