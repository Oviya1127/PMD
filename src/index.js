import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App'; // Your main component

// Select the container with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
