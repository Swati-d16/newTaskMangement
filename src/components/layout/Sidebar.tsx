import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-200 w-64 h-full p-4">
      <ul>
        <li><Link to="/tasks" className="block text-lg">Tasks</Link></li>
        <li><Link to="/board" className="block text-lg">Board</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
