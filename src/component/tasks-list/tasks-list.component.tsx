import "./tasks-list.styles.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Todo, TodoState } from "../../utility/types";
import {
  setTodos,
  updateTodo,
  deleteTodo,
  addTodo,
  setStatusFilter,
} from "../../utility/action";
import Task from "../task/task.component";

const TaskList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: TodoState) => state.statusFilter);
  const todos = useSelector((state: TodoState) => state.todos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const filterTodos = () => {
    switch (status) {
      case "done":
        setFilteredTodos(todos.filter((todo: Todo) => todo.completed));
        break;
      case "undone":
        setFilteredTodos(todos.filter((todo: Todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleDeleteClick = (todo: Todo) => {
    deleteTodoById(todo);
    getAllTodo();
  };

  const handleSaveEdit = (todo: Todo) => {
    if (editingTodo) {
      try {
        updateTodoById(todo, editingTodo);
        const updatedTodos = todos.map((todo: Todo) =>
          todo.id === editingTodo.id ? editingTodo : todo
        );
        dispatch(setTodos(updatedTodos));
        setEditingTodo(null);
      } catch (error) {
        console.error("Error saving edit:", error);
      }
    }
  };
  useEffect(() => {
    getAllTodo();
    return () => console.log("Cleanup..");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, todos]);

  const handleChange = (event: any) => {
    dispatch(setStatusFilter(event.target.value));
  };

  const onCheckboxChange = (index: any, todo: Todo, event: any) => {
    const newTodos = [...todos];
    console.log(newTodos[index]);
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
    updateTodoById(todo, newTodos[index]);
  };

  const getAllTodo = () => {
    axios
      .get("http://localhost:3001/todos")
      .then((response) => {
        dispatch(setTodos(response.data));
      })
      .catch((error) => {});
  };

  const addNewTodo = async (title: string) => {
    const postData = {
      title,
      completed: false,
    };

    await axios
      .post("http://localhost:3001/todos", postData)
      .then((response) => {
        getAllTodo();
        dispatch(addTodo(response.data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateTodoById = async (todo: Todo, updatedTodo: Todo) => {
    await axios
      .put(`http://localhost:3001/todos/${todo.id}`, updatedTodo)
      .then((response) => {
        dispatch(updateTodo(response.data));
      })

      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const deleteTodoById = async (todo: Todo) => {
    await axios
      .delete(`http://localhost:3001/todos/${todo.id}`)
      .then((response) => {
        dispatch(deleteTodo(todo));
      })

      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  const handleOnKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addNewTodo(event.target.value);
      event.target.value = "";
    }
  };
  return (
    <div className="task-container">
      <div className="task-header">
        <h2>Tasks</h2>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={status}
          label="Age"
          onChange={handleChange}
          sx={{
            "& fieldset": {
              border: "none",
            },
            borderRadius: "10px",
            width: "110px",
            height: "29px",
            border: "0!important",
            backgroundColor: "#fff",
          }}
          MenuProps={{
            sx: {
              ".MuiList-root": {
                padding: "10px 6px",
              },
              "& .Mui-selected": {
                backgroundColor: "#585292!important",
                color: "#fff",
                borderRadius: "8px",
              },
            },
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"done"}>Done</MenuItem>
          <MenuItem value={"undone"}>Undone</MenuItem>
        </Select>
      </div>
      <div className="tasks-list-container">
        {filteredTodos?.map((todo: Todo, index: number) => (
          <Task
            key={todo.id}
            todo={todo}
            index={index}
            editingTodo={editingTodo}
            onCheckboxChange={(event: any) => {
              onCheckboxChange(index, todo, event);
            }}
            handleEditClick={handleEditClick}
            handleDeleteTodo={handleDeleteClick}
            handleSaveEdit={handleSaveEdit}
          />
        ))}
      </div>
      <div className="tasks">
        <input
          type="text"
          id="new-todo"
          placeholder="add your todo"
          onKeyDown={handleOnKeyDown}
          className="todo-input"
        />
      </div>
    </div>
  );
};

export default TaskList;
