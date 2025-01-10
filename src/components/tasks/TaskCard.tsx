import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import { Task } from "../../types/Task";

interface TaskCardProps {
  status: string;
  tasks: Task[];
  onEdit: (task: Task) => void; // Added onEdit prop
  onDelete: (taskId: string) => void; // Added onDelete prop
}

const TaskCard: React.FC<TaskCardProps> = ({ status, tasks: initialTasks, onEdit, onDelete }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks); // Initialize with passed tasks
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const navigate = useNavigate();

  // Handle task creation
  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { ...task, id: String(Date.now()) }; // Assign unique ID
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsTaskFormOpen(false); // Close the form after adding a task
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{status}</h3>
        <button
          onClick={() => setIsTaskFormOpen(true)}
          className="px-4 py-2 bg-orange-400 text-white text-sm rounded hover:bg-orange-600"
        >
          + Add Task
        </button>
      </div>

      {/* Render TaskForm */}
      {isTaskFormOpen && (
        <TaskForm
          isOpen={isTaskFormOpen}
          onClose={() => setIsTaskFormOpen(false)}
          onCreate={handleCreateTask}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.dueDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.category}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      onClick={() => navigate(`/task/${task.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 ml-2"
                      onClick={() => onEdit(task)} // Edit task
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 ml-2"
                      onClick={() => onDelete(task.id)} // Delete task
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan={5}>
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskCard;
