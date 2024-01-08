import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Progress from "./component/progress/progress.component";
import TaskList from "./component/tasks-list/tasks-list.component";

function App() {
  return (
    <div className="main-container">
      <div className="paper-container">
        <Progress></Progress>
        <TaskList></TaskList>
      </div>
    </div>
  );
}

export default App;
