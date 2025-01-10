import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types/Task"; // Ensure the Task type is imported

const TaskList: React.FC = () => {
  // Sample tasks
  const tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2025-01-10",
      status: "To Do",
      category: "Work", 
      attachment: null,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      dueDate: "2025-01-12",
      status: "In Progress",
      category: "Personal",
      attachment: null,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      dueDate: "2025-01-15",
      status: "Completed",
      category: "Work",
      attachment: null,
    }
  ];

  // Group tasks by status
  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  // No-op functions for onEdit and onDelete
  const handleEditTask = (task: Task) => {
    console.log("Edit task:", task);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log("Delete task with ID:", taskId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskCard
        status="To Do"
        tasks={groupedTasks["To Do"]}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      <TaskCard
        status="In Progress"
        tasks={groupedTasks["In Progress"]}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      <TaskCard
        status="Completed"
        tasks={groupedTasks["Completed"]}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;
