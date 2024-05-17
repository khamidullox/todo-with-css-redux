import React, { useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  chekTodo,
  removeTodo,
  allRemove,
  chekTodoList,
  allTodo,
  activeTodoList,
} from "./app/TodoSlice";
import toast from "react-hot-toast";
function App() {
  let { todos, active, filter, jarayon, activeFilter } = useSelector(
    (staet) => staet.todoSate
  );
  let dispetch = useDispatch();
  let Inputref = useRef();

  let handleSubmit = (e) => {
    e.preventDefault();

    if (Inputref.current.value.trim()) {
      let newObj = {
        id: Math.random(),
        text: Inputref.current.value,
        chek: false,
      };
      dispetch(addTodo(newObj));
      Inputref.current.value = "";
      toast.success("Successfully add Todo");
    } else {
      toast.error("Create Todo Please");
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Todo</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
          />
        </svg>
      </div>
      <form>
        <input
          className="card__input"
          type="text"
          placeholder="Create a new todo…"
          ref={Inputref}
        />
        <button onClick={handleSubmit} className="card__btn__add"></button>
      </form>
      <div className="card__todo">
        <ul className="card__list">
          {active &&
            todos.map((todo, id) => {
              return (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.chek ? "todo-item-chek" : ""} `}
                >
                  <div className="todo-list">
                    <button
                      onClick={() => {
                        dispetch(chekTodo(todo.id));
                      }}
                      className={`todo-circule ${
                        todo.chek ? "todo-circule-chek" : ""
                      }`}
                    ></button>
                    <p className="item">{todo.text}</p>
                  </div>

                  <button
                    onClick={() => {
                      dispetch(removeTodo(todo.id));
                      toast.error("Your are Todo remove");
                    }}
                    className={`delete`}
                  >
                    ✖
                  </button>
                </li>
              );
            })}
          {!active &&
            filter.map((todo, id) => {
              return (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.chek ? "todo-item-chek" : ""} `}
                >
                  <div className="todo-list">
                    <button
                      onClick={() => {
                        dispetch(chekTodo(todo.id));
                      }}
                      className={`todo-circule ${
                        todo.chek ? "todo-circule-chek" : ""
                      }`}
                    ></button>
                    <p className="item">{todo.text}</p>
                  </div>

                  <button
                    onClick={() => {
                      dispetch(removeTodo(todo.id));
                      toast.error("Your are Todo remove");
                    }}
                    className={`delete`}
                  >
                    ✖
                  </button>
                </li>
              );
            })}
        </ul>
        <nav className="card__nav">
          <p className="card__item-number">
            <span>{todos.length}</span> items left
          </p>
          <ul className="card__nav-list">
            <li className="card__nav-item">
              <button
                onClick={() => {
                  dispetch(allTodo());
                }}
              >
                All
              </button>
            </li>
            <li className="card__nav-item">
              <button
                onClick={() => {
                  dispetch(chekTodoList());
                }}
              >
                Completed
              </button>
            </li>
            <li className="card__nav-item">
              <button
                onClick={() => {
                  dispetch(activeTodoList());
                }}
              ></button>
            </li>
          </ul>
          <button
            onClick={() => {
              dispetch(allRemove());
            }}
            className="card__btn-claer-all"
          >
            Clear Completed
          </button>
        </nav>
      </div>
      <address>Drag and drop to reorder list</address>
    </div>
  );
}

export default App;
