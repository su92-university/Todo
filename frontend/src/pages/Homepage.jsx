// App.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import Navbar from './Nav';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const { user, token, isAuthenticated, isEmailVerified } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/gettasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
      console.log("Tasks after interval:", tasks);


  useEffect(() => {
  if (isAuthenticated() && isEmailVerified()) {
    fetchTasks();
  }
  }, [user, isAuthenticated, isEmailVerified, token]);


  const handleToggleDone = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/toggletask/${id}`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        fetchTasks(); // Refresh the task list
      } else {
        alert('Failed to toggle task status: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
      alert('Error toggling task status. Please try again.');
    }
  };
  
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/deletetask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        fetchTasks(); // Refresh the task list
      } else {
        console.error('Delete failed:', response.data.message);
        alert('Failed to delete task: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task. Please try again.');
    }
  }

  return (
      <div className="App">
        <Navbar />
        
        <main className="main-content">
          {isAuthenticated() && isEmailVerified() ? (
            <>
              <div className="task-header">
                <h1>My Tasks</h1>
                <Link to="/newtask" className="add-task-btn" >
                  <i className="fas fa-plus"></i> Add New Task
                </Link>
              </div>
              <TaskList 
                tasks={tasks}
                onToggleDone={handleToggleDone}
                onDelete={handleDeleteTask}
                onUpdate={fetchTasks}
              />
            </>
          ) : (
            <div className="welcome-section">
              <div className="welcome-content">
                <h1>Organize your work and life, finally.</h1>
                <p>Sign up to start managing your tasks easily and efficiently.</p>
                <Link to="/signup" className="signup-btn">
                  Get Started - It's Free
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
  );
};

export default HomePage;
