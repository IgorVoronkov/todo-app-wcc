import { http, HttpResponse } from 'msw'

// Временный тип — настоящий придёт из Zod-схем в Фазе 3
interface Todo {
  id: string
  text: string
  completed: boolean
}

// In-memory стейт мок-сервера
let todos: Todo[] = [
  { id: '1', text: 'Изучить MSW', completed: false },
  { id: '2', text: 'Подключить TanStack Query', completed: false },
]

export const todosHandlers = [
  // GET /todos — вернуть весь список
  http.get('/todos', () => HttpResponse.json(todos)),

  // POST /todos — создать новую задачу
  http.post('/todos', async ({ request }) => {
    const body = (await request.json()) as { text: string }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: body.text,
      completed: false,
    }
    todos = [...todos, newTodo]
    return HttpResponse.json(newTodo, { status: 201 })
  }),

  // PATCH /todos/:id — переключить completed
  http.patch('/todos/:id', ({ params }) => {
    const { id } = params
    todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    const updated = todos.find((todo) => todo.id === id)
    return HttpResponse.json(updated)
  }),

  // DELETE /todos/:id — удалить задачу
  http.delete('/todos/:id', ({ params }) => {
    const { id } = params
    todos = todos.filter((todo) => todo.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),
]
