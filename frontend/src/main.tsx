import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...'); // Debug log

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
