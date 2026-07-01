import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...'); // Debug log

// Suppress standard Chrome Extension / FIDO2 message channel console noise
if (typeof window !== 'undefined') {
  const isExtensionError = (msg: string) => 
    msg && (
      msg.includes('message channel closed before a response was received') ||
      msg.includes('A listener indicated an asynchronous response')
    );

  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && isExtensionError(event.reason.message)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    if (isExtensionError(event.message)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found!'); // Debug log
  throw new Error('Root element not found');
}

console.log('Root element found, creating React root...'); // Debug log

const reactRoot = createRoot(root);

console.log('Rendering application...'); // Debug log

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
