import { useState } from "react";
import { Task } from "../types/Task";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      id: String(Date.now()), // Generate a unique ID
      title: task.title,
      description: task.description,
      status: task.status || "To Do", // Default to "To Do"
      dueDate: task.dueDate || new Date().toISOString().split("T")[0], // Default to today's date
      category: task.category || "Work", // Default to "Work"
      attachment: task.attachment || null, // Default to no attachment
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task by ID
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
};
