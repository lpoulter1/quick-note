import { useEffect, useState } from "react";
import { TodoList } from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/todos");
      const todos = await data.json();
      setTodos(todos);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <main className="bg-pink-300">
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
