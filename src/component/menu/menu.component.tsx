import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { Todo } from "../../utility/types";
import { MouseEvent } from "react";

interface MoreButtonProps {
  todo: Todo;
  editTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}
const MoreButton = ({ todo, editTodo, deleteTodo }: MoreButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, todo: Todo) => {
    setAnchorEl(event.currentTarget);
  };
  const inputFocus = () => {
    const input = document.getElementById("todo" + todo.id);
    setTimeout(() => {
      input?.focus();
    }, 10);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => handleClick(event, todo)}
        sx={{ color: "#9796A8", marginLeft: "auto" }}
      >
        <MoreHorizIcon
          sx={{ color: "#9796A8", marginLeft: "auto" }}
        ></MoreHorizIcon>
      </Button>
      <Menu
        id="basic-menu"
        elevation={0}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(event) => {
            setAnchorEl(null);
            editTodo(todo);
            handleClose();
            inputFocus();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            deleteTodo(todo);
            handleClose();
          }}
          style={{ color: "red" }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreButton;
