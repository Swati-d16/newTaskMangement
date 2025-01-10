// src/types/Task.ts
export type Task = {
    id: string;
    title: string;
    description: string;
    category: "Work" | "Personal";
    dueDate: any;
    status: "To Do" | "In Progress" | "Completed";
    attachment: File | null;
  };
  