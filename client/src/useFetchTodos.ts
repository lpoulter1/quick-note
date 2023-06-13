import { useQuery, UseQueryResult } from "@tanstack/react-query";

type Todo = {
  id: string;
  title: string;
  description: string;
};

type QueryData = Todo[];

export function useFetchTodos(): UseQueryResult<QueryData, unknown> {
  const url = "http://localhost:3000/todos";

  return useQuery<QueryData, unknown>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Error fetching repositories");

      const data: QueryData = await response.json();

      return data;
    },
  });
}
