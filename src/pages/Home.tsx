import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gradient-to-br from-red-200 to-orange-100 flex items-center justify-center">
      {/* Content Section */}
      <div className="flex flex-col items-start justify-center w-1/2 px-8 pl-12">
        <h1 className=" text-4xl font-semibold text-orange-500 mb-6">Task Manager</h1>
        <Button
          onClick={() => navigate("/login")}
          variant="default"
          className=" bg-slate-800 text-white px-6 py-3 rounded shadow-md hover:bg-slate-600"
        >
          Go to Google Sign-In
        </Button>
      </div>

      {/* Image Section */}
      <div className="w-1/2">
        <img
          src="https://res.cloudinary.com/imagist/image/fetch/q_auto,f_auto,c_scale,w_1536/https%3A%2F%2Ftodoist.com%2Fstatic%2Fhome-teams%2Fintro%2Fwide%2Fheaderui.en.png"
          alt="Task Manager UI"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Home;
