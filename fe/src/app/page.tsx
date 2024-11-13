// src/app/page.tsx
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Todo List</h1>
          <TodoList />
        </div>
      </main>
  )
}