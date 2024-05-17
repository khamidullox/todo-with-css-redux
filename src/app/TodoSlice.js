import { createSlice } from "@reduxjs/toolkit";

let dataFromLoclaStore = () => {
  return (
    JSON.parse(localStorage.getItem("todos")) || {
      todos: [],
      filter: [],
      activeFilter: [],
      active: true,
      jarayon: true,
    }
  );
};
export let todoSlice = createSlice({
  name: "Todo",
  initialState: dataFromLoclaStore,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      todoSlice.caseReducers.setLocal(state);
    },
    chekTodo: (state, { payload }) => {
      let find = state.todos.find((todo, id) => {
        return todo.id == payload;
      });
      find.chek = !find.chek;
      todoSlice.caseReducers.setLocal(state);
    },
    removeTodo: (state, { payload }) => {
      let filterTodo = state.todos.filter((todo, id) => {
        return todo.id !== payload;
      });
      state.todos = filterTodo;
      todoSlice.caseReducers.setLocal(state);
    },
    allRemove: (state, { payload }) => {
      state.todos = [];
      todoSlice.caseReducers.setLocal(state);
    },
    chekTodoList: (state, { payload }) => {
      let chekFilterList = state.todos.filter((todo) => {
        return todo.chek;
      });
      state.active = false;
      state.filter = chekFilterList;
      todoSlice.caseReducers.setLocal(state);
    },
    activeTodoList: (state, { payload }) => {
      let activeFilterList = state.todos.filter((todo, id) => {
        return !todo.chek;
      });
      state.jarayon = false;
      state.activeFilter = activeFilterList;
      console.log(activeFilterList);
      //   todoSlice.caseReducers.setLocal(state);
    },
    allTodo: (state, { payload }) => {
      state.active = true;
      state.jarayon = true;
      todoSlice.caseReducers.setLocal(state);
    },
    setLocal: (state) => {
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});
export let {
  addTodo,
  chekTodo,
  removeTodo,
  allRemove,
  chekTodoList,
  allTodo,
  activeTodoList,
} = todoSlice.actions;
export default todoSlice.reducer;
