import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Basic configuration
// In a real app, you might want to sync this with your app's theme (light/dark)
// For now, 'neutral' or 'default' are good options.
// Ensure theme is one of the valid ones: 'default', 'neutral', 'dark', 'forest', 'base' (with customThemeVariables)
// Note: 'base' theme requires customThemeVariables to be set.
// We'll use 'default' and let users with dark mode rely on Mermaid's own detection or future theme switching.
mermaid.initialize({
  startOnLoad: false,
  theme: 'default', // or 'neutral'
  // Example of further theme customization if needed:
  // themeVariables: {
  //   primaryColor: '#2563eb', // Example: blue-600
  //   mainBkg: '#ffffff',      // Example: white
  //   textColor: '#1f2937',    // Example: gray-800
  //   // ... other variables
  // }
});

/**
 * Renders a Mermaid diagram from a string definition.
 * @param {object} props - The component props.
 * @param {string} props.diagramDefinition - The Mermaid diagram definition string.
 * @param {string} [props.diagramId] - An optional unique ID for the diagram. If not provided, a random one will be generated.
 */
const MermaidDiagram = ({ diagramDefinition, diagramId }) => {
  const containerRef = useRef(null);
  // Ensure diagramId is always a string and valid for DOM IDs
  const validDiagramId = `mermaid-${diagramId || Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    if (containerRef.current && diagramDefinition) {
      // Clear previous diagram before rendering a new one
      containerRef.current.innerHTML = '';
      try {
        // mermaid.render expects an ID of an element where it can temporarily render the SVG before giving it back
        // It doesn't actually render *into* this ID if a callback is used.
        // So, we create a temporary dummy element ID for this internal process.
        const tempRenderId = `render-${validDiagramId}`;

        mermaid.render(tempRenderId, diagramDefinition, (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
            // Optional: Adjust SVG styling if needed, e.g., for responsiveness
            const svgElement = containerRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto'; // Maintain aspect ratio
            }
          }
        });
      } catch (e) {
        console.error("Mermaid rendering error for ID:", validDiagramId, e);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-500">Error rendering diagram: ${e.message}. Check console.</p>`;
        }
      }
    } else if (containerRef.current) {
      // If no diagram definition, clear the container
      containerRef.current.innerHTML = '';
    }
  }, [diagramDefinition, validDiagramId]); // validDiagramId in dependency array

  // Using a key on the div helps React re-render it properly if diagramId changes,
  // though with the cleanup in useEffect, it might be less critical.
  // The class "mermaid" is sometimes used by mermaid.js for styling, but not strictly necessary when injecting SVG directly.
  return (
    <div
      key={validDiagramId}
      ref={containerRef}
      className="mermaid-diagram-container p-4 bg-white dark:bg-neutral-800 rounded shadow-lg my-4 flex justify-center items-center"
    />
  );
};

export default MermaidDiagram;
