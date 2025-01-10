import React, { useState, useEffect } from "react";  // Import useEffect here
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Task } from "../../types/Task";

type TaskFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => void;
  onUpdate?: (task: Task) => void; // Optional
  task?: Task; // Optional
};

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onCreate, onUpdate, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"Work" | "Personal">("Work");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Completed">("To Do");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // If editing a task, pre-fill the form
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);  // Ensure the category is pre-filled if editing
      setStatus(task.status);  // Set the task's status if editing
      setDate(task.dueDate ? new Date(task.dueDate) : undefined);  // Ensure the due date is handled
    }
  }, [task]);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleCreate = () => {
    const dueDate = date ? format(date, "yyyy-MM-dd") : "";  // Format date if selected
    onCreate({ title, description, category, dueDate, status, attachment });
    onClose();
  };
  console.log(handleCreate);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDate = date ? format(date, "yyyy-MM-dd") : "";  // Format date if selected

    const newTask = { title, description, category, dueDate, status, attachment };

    if (task) {
      // Update task
      if (onUpdate) {
        onUpdate({ ...task, ...newTask }); // Ensure onUpdate is not undefined
      }
    } else {
      // Create task
      onCreate(newTask);
    }

    onClose();
  };
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Task Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Task Category */}
            <div>
              <label className="block text-sm font-medium">Category</label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${
                    category === "Work" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCategory("Work")}
                >
                  Work
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${
                    category === "Personal" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCategory("Personal")}
                >
                  Personal
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium">Due On</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Task Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "To Do" | "In Progress" | "Completed")
                }
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <label htmlFor="attachment" className="block text-sm font-medium">
              Attachment
            </label>
            <input
              id="attachment"
              type="file"
              onChange={handleAttachmentChange}
              className="mt-2 w-full text-sm text-gray-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
