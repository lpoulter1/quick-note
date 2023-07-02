/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoList } from "./TodoList";
import { useFetchTodos } from "./useFetchTodos";
import axios from "axios";
import { type Todo } from "../../sharedTypes";

function App() {
  const { isLoading, error, data: todos } = useFetchTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
  }

  if (!todos) {
    return <div>No todos</div>;
  }

  const completedTodos = todos.filter((todo) => todo.done);
  const incompleteTodos = todos.filter((todo) => !todo.done);
  return (
    <main className="container mx-auto ">
      <AddTodo />

      <TodoList todos={incompleteTodos} title="Todo" />

      <TodoList todos={completedTodos} title="Done" />
    </main>
  );
}

type NewTodo = Omit<Todo, "id" | "done">;

function AddTodo() {
  // add react query mutation to p
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: NewTodo) => {
      return axios.post(`http://localhost:3000/todos`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // need to type cast?
    const target = e.target;

    // @ts-ignore
    const description = target.elements.description.value;
    // @ts-ignore
    const title = target.elements.title.value;

    mutation.mutate({ title, description });
  }

  if (mutation.isLoading) return <div>Adding todo...</div>;
  if (mutation.isError) return <div>Something went wrong</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-10">
      <label htmlFor="title">Title</label>
      <input id="title" type="text" placeholder="title" name="title" />

      <label htmlFor="description">Todo</label>
      <textarea id="description" placeholder="description"></textarea>
      <button type="submit" className="text-gray-100 bg-gray-500">
        Add
      </button>
    </form>
  );
}

export default App;
