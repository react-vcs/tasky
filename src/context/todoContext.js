import { createContext, useEffect, useState } from "react";

let TODO_CONTEXT = createContext();
let TODO_PROVIDER = ({ children }) => {
  let [todos, setTodos] = useState(() => {
    let localTodo = localStorage.getItem("todos");
    return localTodo ? JSON.parse(localTodo) : [];
  });
  // Create
  let createTodo = (title) => {
    let todo = {
      title,
      completed: false,
      id: Date.now(),
    };
    setTodos([...todos, todo]);
  };
  // ToggleCompletedStatus
  let togglecompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo?.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // Delete Todo
  let editTodo = (id, title) => {
    setTodos(
      todos.map((todo) => (todo?.id === id ? { ...todo, title } : todo))
    );
  };
  // Delete Todo
  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TODO_CONTEXT.Provider
      value={{
        todos: todos,
        createTodo,
        togglecompleted,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TODO_CONTEXT.Provider>
  );
};

export { TODO_CONTEXT, TODO_PROVIDER };
