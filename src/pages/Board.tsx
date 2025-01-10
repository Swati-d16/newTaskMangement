import React, { useState, useEffect } from "react";
import TaskCard from "../components/tasks/TaskCard";
import { Task } from "../types/Task";
import TaskForm from "../components/tasks/TaskForm";

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle task creation
  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: String(Date.now()), // Assign unique ID
      status: "To Do", // Default status
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handle task editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true); // Open the form for editing
  };

  // Handle task update
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setIsTaskFormOpen(false);
    setEditingTask(null);
    console.log(editingTask);
  };

  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Board</h1>

      {/* Button to open the Task Form */}
      
      {/* TaskForm modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask} // Pass onUpdate
       
      />

      {/* Display task cards grouped by status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {["To Do", "In Progress", "Done"].map((status) => (
          <TaskCard
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
