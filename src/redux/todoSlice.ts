import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface ITodosState {
  todos: ITodo[];
}

const storedTodos = localStorage.getItem("todos");
let parsedTodos: ITodo[] = [];

if (storedTodos) {
  try {
    parsedTodos = JSON.parse(storedTodos);
  } catch (error) {
    console.error("Error parsing todos from local storage:", error);
  }
}

const initialState: ITodosState = {
  todos: parsedTodos,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const { id, title, isCompleted } = action.payload;
      const findTodo = state.todos.find((todo) => todo.id === id);
      if (findTodo) {
        findTodo.title = title;
        findTodo.isCompleted = isCompleted;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
