import { TodoList } from "./TodoList";
import { useFetchTodos } from "./useFetchTodos";

function App() {
  const { isLoading, error, data: todos } = useFetchTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!todos) {
    return <div>No todos</div>;
  }

  return (
    <main className="bg-pink-300">
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
