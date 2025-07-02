import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Tailwind directives
import mermaid from 'mermaid';

// Try to address potential D3 conflicts and initialize Mermaid early
try {
  // If another version of d3 is loaded, it might conflict.
  // This is a workaround suggested in some Mermaid GitHub issues.
  if (window.d3) {
    console.log("Found existing window.d3, attempting to delete to avoid conflict with Mermaid's D3.");
    delete window.d3;
  }
} catch (e) {
  console.error("Error trying to delete window.d3:", e);
}

try {
  console.log("Attempting to initialize Mermaid globally from main.jsx...");
  mermaid.initialize({
    startOnLoad: false, // We will control rendering manually
    theme: 'default', // Or your preferred theme
    // Add other global configurations if needed
  });
  console.log("Mermaid initialized globally from main.jsx.");
} catch (e) {
  console.error("Error initializing Mermaid in main.jsx:", e);
  // Potentially display a global error message to the user or log more aggressively
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
