import React, { useEffect, useRef } from 'react';
import Card from './Card'; // Import the Card component
// import mermaid from 'mermaid'; // Ensure this line is commented out or removed as Mermaid is loaded via CDN

// Basic configuration
// In a real app, you might want to sync this with your app's theme (light/dark)
// For now, 'neutral' or 'default' are good options.
// Ensure theme is one of the valid ones: 'default', 'neutral', 'dark', 'forest', 'base' (with customThemeVariables)
// Note: 'base' theme requires customThemeVariables to be set.
// We'll use 'default' and let users with dark mode rely on Mermaid's own detection or future theme switching.

// Initialize mermaid globally once, if available and not already initialized.
if (window.mermaid && typeof window.mermaid.initialize === 'function' && !window.mermaid.isInitialized) {
  try {
    window.mermaid.initialize({
      startOnLoad: false, // We will render manually
      theme: 'default',   // or 'neutral'
      // securityLevel: 'loose', // Consider if complex diagrams fail due to DOMPurify/XSS protection
    });
    window.mermaid.isInitialized = true; // Flag to prevent re-initialization
  } catch (e) {
    console.error("Error initializing Mermaid from global:", e);
  }
}

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
    const mermaidInstance = window.mermaid; // Use the global mermaid

    if (mermaidInstance && containerRef.current && diagramDefinition) {
      // Fallback initialization if it wasn't done during initial script load/module evaluation
      if (typeof mermaidInstance.initialize === 'function' && !mermaidInstance.isInitialized) {
        try {
          mermaidInstance.initialize({ startOnLoad: false, theme: 'default' });
          mermaidInstance.isInitialized = true;
        } catch (e) {
          console.error("Error re-initializing Mermaid in useEffect:", e);
          // Potentially render an error message if initialization fails critically
        }
      }

      // Clear previous diagram before rendering a new one
      containerRef.current.innerHTML = '';
      try {
        const tempRenderId = `render-temp-${validDiagramId}`;
        let tempElement = document.getElementById(tempRenderId);
        if (!tempElement) {
          tempElement = document.createElement('div');
          tempElement.id = tempRenderId;
          tempElement.style.display = 'none'; // Make it invisible
          document.body.appendChild(tempElement);
        }

        mermaidInstance.render(tempRenderId, diagramDefinition, (svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode;
            // Clean up the temporary element
            const elToRemove = document.getElementById(tempRenderId);
            if (elToRemove) {
              elToRemove.parentNode.removeChild(elToRemove);
            }
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
