import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {error?.statusText || error?.message || 'An unexpected error occurred'}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}