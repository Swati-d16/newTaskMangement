import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "../types/Task";

const TaskDetail: React.FC = () => {
  const { id } = useParams(); // Retrieve the task id from the URL
  const [task, setTask] = useState<Task | null>(null);

  // Load the task from localStorage or any other data source
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      const task = tasks.find((task) => task.id === id);
      setTask(task || null); // Set task if found, otherwise null
    }
  }, [id]);

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <div className="task-details">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created On:</strong> {new Date(Number(task.id)).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskDetail;
