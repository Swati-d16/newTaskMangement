// ./types/index.d.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    category: 'Work' | 'Personal';
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    attachments?: File[];
  }
  