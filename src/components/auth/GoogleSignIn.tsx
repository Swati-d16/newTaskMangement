import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase'; // Use the exported auth instance
import { useAuth } from '../../contexts/AuthContext';

const GoogleSignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider); // Using exported auth
      setUser(result.user);
      navigate('/tasks');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleSignIn}
        className="bg-slate-800 text-white px-6 py-2 rounded shadow-md hover:bg-slate-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
