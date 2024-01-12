import React from 'react';
import { Navigate } from 'react-router-dom';
import { isClient, isAdmin } from '../../helpers/auth.js'; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('token') != null;
  let isAuthorized = false;

  // Assuming isClient and isAdmin are correctly defined in the imported file
  if (requiredRole === 'client') {
    isAuthorized = isClient();
  } else if (requiredRole === 'admin') {
    isAuthorized = isAdmin();
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/landing" replace />;
  } else if (!isAuthorized) {
    // Render an access denied message if not authorized
    return <div>Access Denied</div>;
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute; // Don't forget to export your component!
