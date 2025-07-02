import React, { useEffect, useRef, useMemo } from 'react';
import Card from './Card';

// globalMermaidInitialized flag is no longer needed here as initialization is moved to main.jsx

const MermaidDiagram = ({ diagramDefinition, diagramId }) => {
  const containerRef = useRef(null);
  const timeoutIdRef = useRef(null);

  const validDiagramId = useMemo(() => {
    return `mermaid-${diagramId || Math.random().toString(36).substring(7)}`;
  }, [diagramId]);

  useEffect(() => {
    if (!diagramDefinition) {
      if (containerRef.current) containerRef.current.innerHTML = '';
      clearTimeout(timeoutIdRef.current);
      return;
    }

    const performRender = async () => { // Added async here
      if (!containerRef.current) {
        console.log("MermaidDiagram: Render deferred but component unmounted for ID:", validDiagramId);
        return;
      }
      containerRef.current.innerHTML = '';

      const mermaidInstance = window.mermaid; // Assuming mermaid is globally available via import in main.jsx

      // Initialization is now handled globally in main.jsx
      // No need for globalMermaidInitialized flag or initialize call here.

      // Ensure mermaidInstance is available before proceeding
      if (!mermaidInstance || typeof mermaidInstance.render !== 'function') {
        console.error("MermaidDiagram: Mermaid instance or render function not available for ID:", validDiagramId);
        if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-red-500">Mermaid library not fully loaded.</p>`;
        }
        return;
      }

      try {
        console.log(`MermaidDiagram: Attempting to render diagram async for ID: ${validDiagramId}`);

        // Using async/await with mermaid.render, assuming it returns a promise {svg, bindFunctions}
        // The first argument to mermaid.render is an ID for a temporary element Mermaid creates.
        const tempRenderId = `mermaid-temp-${validDiagramId}-${Date.now()}`;

        // Ensure the container is clear before attempting to render
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        const { svg, bindFunctions } = await mermaidInstance.render(tempRenderId, diagramDefinition);

        if (!containerRef.current) {
            console.warn("MermaidDiagram: Container ref became null after async render for ID:", validDiagramId);
            return; // Component might have unmounted
        }

        containerRef.current.innerHTML = svg;
        if (bindFunctions) {
            bindFunctions(containerRef.current);
        }

        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
        }
        console.log(`MermaidDiagram: Successfully rendered diagram for ID: ${validDiagramId}`);

      } catch (error) {
        console.error("MermaidDiagram: Error during async mermaid.render or processing for ID:", validDiagramId, error);
        if (containerRef.current) {
          // Check if the error object has a more specific message or details
          const errorMessage = error.str || error.message || "Unknown error during rendering.";
          containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error">Error rendering diagram: ${errorMessage}. Check console.</p>`;
        }
      }
    };

    // tryInitAndRender calls performRender
    const tryInitAndRender = () => {
      if (!containerRef.current) {
        // If the container isn't there yet, schedule a retry.
        // This can happen if React hasn't mounted the div yet.
        console.log("MermaidDiagram: Container ref not available yet for ID:", validDiagramId, ". Retrying soon.");
        timeoutIdRef.current = setTimeout(tryInitAndRender, 50); // Short delay for retry
        return;
      }

      // Initialize is global, so we only need to check for render here,
      // assuming mermaid object itself will exist if main.jsx import worked.
      if (window.mermaid && typeof window.mermaid.render === 'function') {
        performRender(); // Directly call performRender now that checks have passed
      } else {
        // Mermaid library itself isn't loaded yet, or render function is missing.
        if (containerRef.current) { // Check ref again before updating innerHTML
          containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not available yet. Retrying...</p>`;
        }
        console.log("MermaidDiagram: Mermaid library not ready for ID:", validDiagramId, ". Retrying soon.");
        timeoutIdRef.current = setTimeout(tryInitAndRender, 150); // Longer delay for library loading
      }
    };

    tryInitAndRender(); // Initial attempt to render

    return () => {
      clearTimeout(timeoutIdRef.current);
      // Optional: Clean up the container if the component unmounts while rendering or waiting
      // if (containerRef.current) {
      //   containerRef.current.innerHTML = '';
      // }
      console.log("MermaidDiagram: Cleanup for ID:", validDiagramId);
    };
  }, [diagramDefinition, validDiagramId]); // performRender is not added as a dependency because it's defined within the effect or should be memoized if outside

  return (
    <Card
      padding="p-4"
      shadow="lg"
      rounded="lg"
      className="mermaid-diagram-container my-4 flex justify-center items-center"
    >
      <div
        key={validDiagramId}
        id={validDiagramId}
        ref={containerRef}
        data-testid="mermaid-inner-container"
        style={{ width: '100%', minHeight: '50px' }} // Ensure container has dimensions
      />
    </Card>
  );
};

export default MermaidDiagram;
