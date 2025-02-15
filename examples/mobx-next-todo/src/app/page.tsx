import {fetchTodos, TodoList} from "@/todos";

export default async function Todos () {
  const initialTodos = await fetchTodos()

  return (
      <>
        <TodoList initialTodos={initialTodos} />
      </>
  );
}
