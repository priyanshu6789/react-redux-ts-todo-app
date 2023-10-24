import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITodo, addTodo, deleteTodo, updateTodo } from "../redux/todoSlice";
import { RootState } from "../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";

import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

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
    <Box sx={{ width: "90%" }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        My todo app
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Title"
          variant="standard"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          sx={{ width: "90%" }}
          required
        />
        <Fab color="primary" aria-label="add" type="submit">
          <AddIcon />
        </Fab>
      </form>
      {todos.length === 0 && (
        <Typography variant="h5" mt={2} sx={{ textAlign: "center" }}>
          No todos found!
        </Typography>
      )}
      {todos?.map((todo, index) => {
        return (
          <Box key={todo.id} marginBlock={2}>
            <Paper elevation={16} sx={{ height: "4.5rem", padding: "1rem" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: todo.isCompleted
                        ? "line-through"
                        : "none",
                      textDecorationColor: "#f50c0c",
                    }}
                  >
                    {`${index + 1}. ${todo.title}`}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Checkbox
                    defaultChecked={todo.isCompleted}
                    onChange={() => handleCompleteTodo(todo)}
                  />
                  {updateTodoTitle && updateTitle.id === todo.id && (
                    <form
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        dispatch(
                          updateTodo({ ...todo, title: updateTitle.title })
                        );
                        setUpdateTitle({ id: "", title: "" });
                        setUpdateTodoTitle(false);
                      }}
                    >
                      <TextField
                        id="update"
                        label="Update Title"
                        variant="standard"
                        value={updateTitle.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setUpdateTitle((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        required
                      />
                      <Tooltip title="Save">
                        <IconButton
                          type="submit"
                          aria-label="delete"
                          color="info"
                        >
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                    </form>
                  )}
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon
                        onClick={() => handleDelete(todo.id)}
                        color="error"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon
                        color="secondary"
                        onClick={() => {
                          setUpdateTodoTitle(true);
                          setUpdateTitle({ id: todo.id, title: todo.title });
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

export default Todo;
