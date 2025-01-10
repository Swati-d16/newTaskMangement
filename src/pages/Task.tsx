import React, { useState } from "react";
import TaskList from "../components/tasks/TaskList";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskForm from '../components/tasks/TaskForm';
import TaskHistory from "@/components/tasks/TaskHistory";
import { Task } from "../types/Task";


const Tasks: React.FC = () => {
  const categories = ['Work', 'Personal'];
  const [selectedCategory, setSelectedCategory] = useState<string>('Work');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

   // Handle task creation
   const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { ...task, id: String(Date.now()) }; // Assign unique ID
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>
      <div className="flex justify-between">
      <TaskFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
       {/* Add Task Button */}
       <button
        className="px-4 py-2 h-10 bg-orange-400 text-white rounded hover:bg-orange-600 mb-4"
        onClick={() => setIsTaskFormOpen(true)}
      >
        + Add Task
      </button>

      {/* Task Form */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onCreate={handleCreateTask}
      />
      </div>
      <div className="p-5 ">
      <TaskList />
      </div>
      

      {/* Task History */}
      <TaskHistory history={tasks} />
    

    </div>
  );
};

export default Tasks;
