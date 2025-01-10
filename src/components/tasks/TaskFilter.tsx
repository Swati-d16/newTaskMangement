import React from 'react';

interface TaskFilterProps {
  categories: string[];  // List of categories
  selectedCategory: string;  // Selected category
  onChange: (category: string) => void;  // Function to handle category change
}

const TaskFilter: React.FC<TaskFilterProps> = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Filter Tasks</h2>
      <div>
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-80 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
