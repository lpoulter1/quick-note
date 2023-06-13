import { type Todo } from "../../sharedTypes";

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      <h1>Todo List</h1>
      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
