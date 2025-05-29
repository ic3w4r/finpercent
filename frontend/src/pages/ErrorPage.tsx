import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="neo-card p-8">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="mb-4">The page you are looking for does not exist.</p>
        <button 
          className="neo-button px-4 py-2"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
