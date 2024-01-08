import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./progress.styles.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../../utility/action";
import { Todo, TodoState } from "../../utility/types";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 800 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#fff",
  },
}));

const Progress = () => {
  const dispatch = useDispatch();

  const progress = useSelector((state: TodoState) => {
    const completedTodos = state.todos?.filter((todo: Todo) => todo.completed);
    return (completedTodos.length / state.todos.length) * 100 || 0;
  });
  const completedCount = useSelector((state: TodoState) => {
    const completedTodos = state.todos.filter((todo: Todo) => todo.completed);
    return completedTodos.length;
  });
  useEffect(() => {
    getAllTodo();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, completedCount]);

  const getAllTodo = async () => {
    await axios
      .get("http://localhost:3001/todos")
      .then((response) => {
        dispatch(setTodos(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="progress-container">
      <h1>Progress</h1>
      <BorderLinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "8px",
          marginTop: "12.66px",
          marginBottom: "12.66px",
        }}
      ></BorderLinearProgress>
      <p>{completedCount} completed</p>
    </div>
  );
};

export default Progress;
