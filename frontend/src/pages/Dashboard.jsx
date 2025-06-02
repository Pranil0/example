import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.fullName }</h1>
      <p>Your dashboard content goes here.</p>
    </div>
  );
};

export default Dashboard;
