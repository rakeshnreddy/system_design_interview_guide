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
  const timeoutIdRef = useRef(null); // Ref to store timeout ID
  // Ensure diagramId is always a string and valid for DOM IDs
  const validDiagramId = `mermaid-${diagramId || Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    // If there's no diagram definition, ensure the container is cleared and do nothing else.
    if (containerRef.current && !diagramDefinition) {
      containerRef.current.innerHTML = '';
      return; // Exit early
    }

    // Proceed with initialization and rendering only if there is a diagramDefinition
    const initializeAndRender = () => { // Removed async as render now uses callback
      const mermaidInstance = window.mermaid;
      if (!mermaidInstance) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not available yet. Retrying...</p>`;
        }
        // Store timeout ID for cleanup
        timeoutIdRef.current = setTimeout(initializeAndRender, 500);
        return;
      }

      if (typeof mermaidInstance.initialize === 'function' && !mermaidInstance.isInitialized) {
        try {
          console.log("MermaidDiagram: Initializing Mermaid...");
          mermaidInstance.initialize({
            startOnLoad: false,
            theme: 'default',
            // securityLevel: 'loose', // Consider if complex diagrams fail due to XSS protection by DOMPurify
          });
          mermaidInstance.isInitialized = true;
          console.log("MermaidDiagram: Mermaid initialized.");
        } catch (e) {
          console.error("MermaidDiagram: Error initializing Mermaid:", e);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-red-500">Failed to initialize Mermaid: ${e.message}</p>`;
          }
          return;
        }
      }

      if (mermaidInstance.isInitialized && containerRef.current) {
        if (diagramDefinition) {
          containerRef.current.innerHTML = ''; // Clear previous
          try {
            // Use validDiagramId which is the ID of the div ref={containerRef}
            // The render function will use this ID to know where to put the SVG if no callback is provided,
            // or as a base for generating unique IDs if a callback IS provided.
            // The callback is preferred as it gives direct access to the SVG code.
            console.log(`MermaidDiagram: Rendering diagram for ID: ${validDiagramId}`);
            // It's crucial that mermaid.render is called after the DOM element (containerRef.current) is available.
            // The callback approach is generally safer.
            // Reverting to the callback version of render.
            // The first argument to render is an ID for mermaid's internal use if it needs to create a temporary element,
            // even if we are using the callback to get the SVG code.
            const renderPromise = new Promise((resolve, reject) => {
              mermaidInstance.render(validDiagramId + "-temp-svg", diagramDefinition, (svgCode, bindFunctions) => {
                try {
                  if (containerRef.current) {
                    containerRef.current.innerHTML = svgCode;
                    if (bindFunctions) {
                      bindFunctions(containerRef.current);
                    }
                    const svgElement = containerRef.current.querySelector('svg');
                    if (svgElement) {
                      svgElement.style.maxWidth = '100%';
                      svgElement.style.height = 'auto';
                    }
                    resolve(); // Resolve the promise on success
                  } else {
                    // This case should ideally not happen if component is still mounted
                    console.warn("MermaidDiagram: Container ref became null during render callback.");
                    reject(new Error("Container ref became null during render callback."));
                  }
                } catch (innerError) {
                  reject(innerError); // Reject if error within callback processing
                }
              });
              // It's possible mermaid.render itself might throw if definition is bad before async part
            });

            renderPromise.catch(e => {
              console.error("MermaidDiagram: Error during or after mermaid.render (async):", validDiagramId, e);
              if (containerRef.current) {
                containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-async">Error rendering diagram (async): ${e.message}. Check console.</p>`;
              }
            });

          } catch (e) { // This synchronous catch is for errors thrown directly by mermaid.render call itself
            console.error("MermaidDiagram: Synchronous error calling mermaid.render:", validDiagramId, e);
            if (containerRef.current) {
              containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-sync">Error calling render: ${e.message}. Check console.</p>`;
            }
          }
        } else {
          containerRef.current.innerHTML = ''; // Clear if no definition
        }
      } else if (containerRef.current && mermaidInstance && !mermaidInstance.isInitialized) {
         // This case should ideally be caught by the initialization block,
         // but as a fallback if isInitialized is somehow false despite mermaidInstance existing.
         containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library loaded but not initialized. Retrying...</p>`;
         setTimeout(initializeAndRender, 500); // Retry initialization as well
      }
    };

    const tryInitAndRender = () => {
      if (document.readyState === 'complete') {
        initializeAndRender();
      } else {
        console.log("MermaidDiagram: Document not ready, deferring Mermaid initialization/render.");
        window.addEventListener('load', initializeAndRender, { once: true });
      }
    };

    tryInitAndRender();

    return () => {
      // Cleanup: Remove event listener if the component unmounts before 'load' fires
      window.removeEventListener('load', initializeAndRender);
      // Note: setTimeout from initializeAndRender's retry logic is not cleaned up here.
      // A more robust implementation might use a ref to store the timeout ID and clear it.
    };
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
        data-testid="mermaid-inner-container"
        // Inner div to hold the diagram, as Card adds its own padding and structure
      />
    </Card>
  );
};

export default MermaidDiagram;
