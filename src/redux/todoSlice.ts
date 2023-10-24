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

const initialState: ITodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const { id, title, isCompleted } = action.payload;
      const findTodo = state.todos.find((todo) => todo.id === id);
      if (findTodo) {
        findTodo.title = title;
        findTodo.isCompleted = isCompleted;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
