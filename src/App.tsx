import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoutes';
import Home from './pages/Home';
import Tasks from './pages/Task';
import Layout from './components/layout/Layout';
import GoogleSignIn from './components/auth/GoogleSignIn';
import Board from './pages/Board';
import TaskDetail from './pages/TaskDetail';


const App: React.FC = () => {
  return (
    <AuthProvider>
      
      <Router>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleSignIn />} />
          
          {/* Private routes */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                 <Layout>
                  <Tasks />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/board"
            element={
              <PrivateRoute>
                 <Layout>
                  <Board />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <PrivateRoute>
                 <Layout>
                 <TaskDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          
         

          
        </Routes>
       
      </Router>
      
    </AuthProvider>
  );
};

export default App;
