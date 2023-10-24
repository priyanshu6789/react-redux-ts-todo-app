import { Container } from "@mui/material";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90vw",
          marginBlock: "2rem",
        }}
      >
        <Todo />
      </Container>
    </>
  );
}

export default App;
