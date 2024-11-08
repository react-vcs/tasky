import { useContext, useState } from "react";
import { TODO_CONTEXT } from "./context/todoContext";

const App = () => {
  let { todos, createTodo, editTodo, togglecompleted, deleteTodo } =
    useContext(TODO_CONTEXT);
  let [newTodo, setNewTodo] = useState("");
  let [buttonText, setbuttonText] = useState("ADD");
  let [currentEditedTodoId, setcurrentEditedTodoId] = useState(0);

  let newTodoSubmitHandle = (e) => {
    e.preventDefault();
    if (newTodo.length <= 0) {
      return;
    }
    if (buttonText === "ADD") {
      createTodo(newTodo);
      setNewTodo("");
    }
    if (buttonText === "SUBMIT") {
      editTodo(currentEditedTodoId, newTodo);
      setNewTodo("");
      setbuttonText("ADD");
    }
  };
  let submitEditTodo = (id) => {
    let [editedItem] = todos.filter((todo) => todo.id === id);
    setcurrentEditedTodoId(id);
    setbuttonText("SUBMIT");
    setNewTodo(editedItem?.title);
  };
  return (
    <>
      <h1>TO-DO List</h1>
      <form id="addToDo" onSubmit={newTodoSubmitHandle}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>{buttonText}</button>
      </form>
      {todos.map((todo) => {
        return (
          <div key={todo?.id}>
            <input
              type="checkbox"
              checked={todo?.completed}
              onChange={(e) => {
                togglecompleted(todo?.id);
              }}
            />
            <span
              style={todo?.completed ? { textDecoration: "line-through" } : {}}
            >
              {todo.title}
            </span>
            <span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  submitEditTodo(todo?.id);
                }}
              >{` edit`}</span>{" "}
              |{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteTodo(todo?.id);
                }}
              >
                delete
              </span>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default App;
