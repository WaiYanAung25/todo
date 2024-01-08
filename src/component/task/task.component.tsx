import React from "react";
import { Checkbox } from "@mui/material";
import MoreButton from "../menu/menu.component";
import { Todo } from "../../utility/types";

interface TaskProps {
  todo: Todo;
  editingTodo: Todo | null;
  index: number;
  onCheckboxChange: (
    index: number,
    todo: Todo,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleEditClick: (todo: Todo) => void;
  handleDeleteTodo: (todo: Todo) => void;
  handleSaveEdit: (todo: Todo) => void;
}

const Task = ({
  todo,
  index,
  editingTodo,
  onCheckboxChange,
  handleEditClick,
  handleDeleteTodo,
  handleSaveEdit,
}: TaskProps) => {
  return (
    <div className="tasks" key={todo.id}>
      {editingTodo?.id !== todo.id && (
        <Checkbox
          checked={todo.completed}
          onChange={(event) => onCheckboxChange(index, todo, event)}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 22, color: "#585292" },
          }}
        />
      )}

      {editingTodo?.id === todo.id ? (
        <>
          <input
            type="text"
            id={`todo${todo.id}`}
            value={editingTodo?.title}
            onChange={(e) =>
              handleEditClick({
                ...editingTodo!,
                title: e.target.value,
              })
            }
            className="todo-input"
          />
          <button className="save-button" onClick={() => handleSaveEdit(todo)}>
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            id={`todo${todo.id}`}
            value={todo.title}
            readOnly
            className={`todo-input ${todo.completed ? "completed-input" : ""}`}
          />
          <MoreButton
            todo={todo}
            deleteTodo={handleDeleteTodo}
            editTodo={handleEditClick}
          ></MoreButton>
        </>
      )}
    </div>
  );
};

export default Task;
