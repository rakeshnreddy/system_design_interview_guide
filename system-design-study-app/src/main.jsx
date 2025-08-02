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
    theme: 'dark',    // Base theme
    themeVariables: {
      // Primary text color used for labels, node text, etc.
      textColor: '#ECEFF4', // A light color (Nord Polar Night collection)
      // Specific text color for nodes if different
      nodeTextColor: '#ECEFF4',
      // Line color for edges and borders
      lineColor: '#D8DEE9',   // A lighter grey
      // Background for edge labels if they need contrast
      edgeLabelBackground: '#4C566A', // A darker grey from Nord, for contrast if labels have background
      // Colors for specific diagram types if needed (e.g., sequence diagram actor lines)
      actorLineColor: '#D8DEE9',
      signalColor: '#D8DEE9',
      labelTextColor: '#ECEFF4', // For specific labels outside nodes
      // Ensure backgrounds are dark if not already handled by 'dark' theme
      mainBkg: '#2E3440', // Nord dark background
      nodeBorder: '#D8DEE9',
    }
  });
  console.log("Mermaid initialized globally from main.jsx with dark theme and custom themeVariables.");
} catch (e) {
  console.error("Error initializing Mermaid in main.jsx:", e);
  // Potentially display a global error message to the user or log more aggressively
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
