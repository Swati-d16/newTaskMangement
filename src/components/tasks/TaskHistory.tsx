import React from "react";
import { Task } from "../../types/Task";

type TaskHistoryProps = {
  history: Task[];
};

const TaskHistory: React.FC<TaskHistoryProps> = ({ history }) => {
  return (
    <div>
      <h2>Task History</h2>
      <ul>
        {history.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} (Due: {task.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskHistory;
