import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const Navbar: React.FC = () => {
     const auth = getAuth();
    const user = auth.currentUser;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left side: Heading */}
      <div className="text-xl font-bold">
        <h1 className="text-3xl font-semibold text-orange-400">Task Manager</h1>
      </div>

      {/* Right side: Username and Logout */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              {/* User's initials */}
              
              <div className="w-8 h-8 bg-gray-600 text-center rounded-full flex items-center justify-center">
                {user.displayName ? user.displayName.charAt(0) : "U"}
              </div>
              <div className="text-sm">
                <p className="text-gray-400 text-xs">{user.email}</p>
              
              </div>
              <Link
            to="/"
            className="bg-white-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </Link>
            </div>

          
          </>
        ) : (
          <Link
            to="/"
            className="bg-white-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
