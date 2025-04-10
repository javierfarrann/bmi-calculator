import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowMessage(true);
    }
  }, [currentUser]);

  if (!currentUser && showMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-xl font-semibold text-red-600 mb-4">
          Please login first.
        </h1>
        <p className="text-gray-700">
          If you don&apos;t have an account yet,{' '}
          <a
            href="/register"
            className="text-blue-600 underline hover:text-blue-800"
          >
            REGISTER
          </a>
        </p>
      </div>
    );
  }

  return currentUser ? children : null;
};

export default ProtectedRoute;
