import { combineReducers } from "redux";
import { Todo } from "./types";

const todosReducer = (state = [], action: any) => {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "UPDATE_TODO":
      return state.map((todo: Todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case "DELETE_TODO":
      return state.filter((todo: Todo) => todo.id !== action.payload.id);
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
};

const statusFilterReducer = (state = "all", action: any) => {
  switch (action.type) {
    case "SET_STATUS_FILTER":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos: todosReducer,
  statusFilter: statusFilterReducer,
});

export default rootReducer;
