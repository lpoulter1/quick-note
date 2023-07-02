import { type Todo } from "../../sharedTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function TodoList({ todos, title }: { todos: Todo[]; title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

type NewTodo = Omit<Todo, "id">;

function TodoCard(props: { todo: Todo }) {
  const { title, description, done } = props.todo;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: NewTodo) => {
      return axios.patch(`http://localhost:3000/todos/${newTodo.id}`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleSetDone(newDone: boolean) {
    mutation.mutate({ ...props.todo, done: newDone });
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{done ? "✅" : "❌"}</p>
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => handleSetDone(e.target.checked)}
      />
    </div>
  );
}
