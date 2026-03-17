import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RoutePath } from '../../types';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6F9]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to={RoutePath.LOGIN} state={{ from: location }} replace />;
  }

  // If authenticated but not verified, redirect to verification page
  if (isAuthenticated && !user?.emailVerified) {
    return <Navigate to={RoutePath.VERIFY_EMAIL} state={{ email: user?.email }} replace />;
  }

  return <>{children}</>;
};
