import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITodo, addTodo, deleteTodo, updateTodo } from "../redux/todoSlice";
import { RootState } from "../redux/store";

const Todo = () => {
  const [title, setTitle] = useState<string>("");
  const [updateTodoTitle, setUpdateTodoTitle] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<{ id: string; title: string }>(
    { id: "", title: "" }
  );
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todo: ITodo = {
      id: Date.now() + "",
      title,
      isCompleted: false,
    };
    dispatch(addTodo(todo));
    setTitle("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const handleCompleteTodo = (todo: ITodo) => {
    dispatch(updateTodo({ ...todo, isCompleted: !todo.isCompleted }));
  };
  return (
    <>
      <h1>My todo app</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button type="submit">Add </button>
      </form>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <li>
              {todo.title}
              <br />
              <label htmlFor="status">Status</label>
              <input
                type="checkbox"
                id="status"
                checked={todo.isCompleted}
                onChange={() => handleCompleteTodo(todo)}
              />
              {!todo.isCompleted ? "Not done" : "Done"}
              {updateTodoTitle && updateTitle.id === todo.id && (
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    dispatch(updateTodo({ ...todo, title: updateTitle.title }));
                    setUpdateTitle({ id: "", title: "" });
                    setUpdateTodoTitle(false);
                  }}
                >
                  <label htmlFor="update">Update Title</label>
                  <input
                    type="text"
                    name=""
                    id="update"
                    value={updateTitle.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdateTitle((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <button type="submit">Save</button>
                </form>
              )}
            </li>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button
              onClick={() => {
                setUpdateTodoTitle(true);
                setUpdateTitle({ id: todo.id, title: todo.title });
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Todo;
