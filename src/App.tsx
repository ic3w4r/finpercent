import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './routes';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="neo-card p-8">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button 
              className="neo-button px-4 py-2"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="md:pl-64 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <AppRoutes viewMode="classic" />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  console.log('App rendering'); // Debug log
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
