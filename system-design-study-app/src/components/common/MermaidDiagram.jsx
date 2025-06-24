import React, { useEffect, useRef } from 'react';
import Card from './Card'; // Import the Card component
// import mermaid from 'mermaid'; // Ensure this line is commented out or removed as Mermaid is loaded via CDN

// Basic configuration
// In a real app, you might want to sync this with your app's theme (light/dark)
// For now, 'neutral' or 'default' are good options.
// Ensure theme is one of the valid ones: 'default', 'neutral', 'dark', 'forest', 'base' (with customThemeVariables)
// Note: 'base' theme requires customThemeVariables to be set.
// We'll use 'default' and let users with dark mode rely on Mermaid's own detection or future theme switching.

// Global flag to ensure mermaid is initialized only once.
// We'll manage this within the component's useEffect for better control with CDN loading.
// let isMermaidInitialized = false;

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
    const mermaidInstance = window.mermaid;

    if (mermaidInstance && typeof mermaidInstance.initialize === 'function' && !mermaidInstance.isInitialized) {
      try {
        console.log("Initializing Mermaid in useEffect");
        mermaidInstance.initialize({
          startOnLoad: false,
          theme: 'default',
          // securityLevel: 'loose', // Consider if complex diagrams fail
        });
        mermaidInstance.isInitialized = true; // Set the global flag
      } catch (e) {
        console.error("Error initializing Mermaid in useEffect:", e);
        if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-red-500">Failed to initialize Mermaid: ${e.message}</p>`;
        }
        return; // Stop if initialization fails
      }
    }

    if (mermaidInstance && mermaidInstance.isInitialized && containerRef.current && diagramDefinition) {
      containerRef.current.innerHTML = ''; // Clear previous diagram
      const tempRenderId = `render-temp-${validDiagramId}`;

      // Ensure the temporary element for rendering exists
      let tempElement = document.getElementById(tempRenderId);
      if (!tempElement) {
        tempElement = document.createElement('div');
        tempElement.id = tempRenderId;
        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);
      }

      try {
        console.log(`Attempting to render Mermaid diagram with ID: ${tempRenderId}`);
        mermaidInstance.render(tempRenderId, diagramDefinition, (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
            const svgElement = containerRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
            }
          }
          // Clean up the temporary element
          if (tempElement && tempElement.parentNode) {
            tempElement.parentNode.removeChild(tempElement);
          }
        });
      } catch (e) {
        console.error("Mermaid rendering error for ID:", validDiagramId, e);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-500">Error rendering diagram: ${e.message}. Check console.</p>`;
        }
        // Clean up temp element on error too
        if (tempElement && tempElement.parentNode) {
            tempElement.parentNode.removeChild(tempElement);
        }
      }
    } else if (containerRef.current && !diagramDefinition) {
      containerRef.current.innerHTML = ''; // Clear if no definition
    } else if (!mermaidInstance) {
        if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not available yet. Waiting for CDN...</p>`;
        }
        // Optionally, you could add a retry mechanism or a listener for when window.mermaid becomes available
    }
  }, [diagramDefinition, validDiagramId]);

  // Using a key on the div helps React re-render it properly if diagramId changes,
  // though with the cleanup in useEffect, it might be less critical.
  // The class "mermaid" is sometimes used by mermaid.js for styling, but not strictly necessary when injecting SVG directly.
  return (
    <Card
      padding="p-4" // Equivalent to 'sm' or pass directly
      shadow="lg"
      rounded="lg" // Tailwind 'rounded-lg'
      className="mermaid-diagram-container my-4 flex justify-center items-center"
    >
      <div
        key={validDiagramId}
        ref={containerRef}
        // Inner div to hold the diagram, as Card adds its own padding and structure
      />
    </Card>
  );
};

export default MermaidDiagram;
