import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleGoHome = () => {
    window.location.href = '/overview';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 text-[#111111] dark:text-gray-100">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800 rounded-2xl p-8 text-center space-y-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FDEBEC] text-[#9F2F2D] dark:bg-red-950/40 dark:text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif">Something unexpected happened</h2>
              <p className="text-xs text-neutral-500 leading-relaxed font-mono">
                {this.state.error?.message || 'A runtime rendering exception occurred.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-2.5 px-4 border border-neutral-200 dark:border-gray-800 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-gray-800 transition flex items-center justify-center space-x-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
