import React, { useEffect, useRef, useMemo } from 'react';
import Card from './Card'; // Import the Card component

const MermaidDiagram = ({ diagramDefinition, diagramId }) => {
  const containerRef = useRef(null);
  const timeoutIdRef = useRef(null);

  // Stabilize validDiagramId using useMemo
  const validDiagramId = useMemo(() => {
    return `mermaid-${diagramId || Math.random().toString(36).substring(7)}`;
  }, [diagramId]); // Only recalculate if the input diagramId prop changes

  useEffect(() => {
    // Initial check: if no definition, clear and exit effect.
    if (!diagramDefinition) {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      clearTimeout(timeoutIdRef.current); // Clear any pending timeouts
      return;
    }

    const initializeAndRender = () => {
      const mermaidInstance = window.mermaid;

      if (!mermaidInstance) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not available yet. Retrying...</p>`;
        }
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(initializeAndRender, 500);
        return;
      }

      // const mermaidInstance = window.mermaid; // Already defined above

      if (!mermaidInstance || typeof mermaidInstance.initialize !== 'function' || typeof mermaidInstance.render !== 'function') {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not fully available yet. Retrying...</p>`;
        }
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(initializeAndRender, 500); // Retry initialization/render
        return;
      }

      // Proceed to render
      if (containerRef.current && diagramDefinition) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
          if (!containerRef.current) {
            console.log("MermaidDiagram: Render deferred but component unmounted for ID:", validDiagramId);
            return;
          }
          containerRef.current.innerHTML = ''; // Clear just before rendering

          // Use the mermaidInstance captured at the start of initializeAndRender
          // This assumes mermaidInstance itself doesn't become stale, which is typical for window globals.
          if (!mermaidInstance) { // Should ideally not happen if we passed the checks above
            console.error("MermaidDiagram: Mermaid instance lost before deferred render for ID:", validDiagramId);
            if (containerRef.current) {
                containerRef.current.innerHTML = `<p class="text-red-500">Mermaid library instance lost.</p>`;
            }
            return;
          }

          try {
            // Initialize Mermaid. Mermaid's initialize should be safe to call multiple times.
            // It typically checks if it's already initialized or reconfigures.
            if (!window.mermaidInitialized) {
              mermaidInstance.initialize({ startOnLoad: false, theme: 'default' });
              window.mermaidInitialized = true; // Set flag after first initialization
              // console.log(`MermaidDiagram: Mermaid initialized for the first time for render ID: ${validDiagramId}`);
            }
            // console.log(`MermaidDiagram: Ensured Mermaid initialized for render ID: ${validDiagramId}`);

            console.log(`MermaidDiagram: Deferred rendering diagram for ID: ${validDiagramId}`);
            // Using a promise wrapper to better handle errors from the render callback itself
            new Promise((resolve, reject) => {
                mermaidInstance.render(validDiagramId + "-svg-temp", diagramDefinition, (svgCode, bindFunctions) => {
                    if (!containerRef.current) { // Check ref again inside async callback
                        console.warn("MermaidDiagram: Container ref became null during mermaid.render callback for ID:", validDiagramId);
                        reject(new Error("Container ref became null during mermaid.render callback."));
                        return;
                    }
                    try {
                        containerRef.current.innerHTML = svgCode;
                        if (bindFunctions) {
                            bindFunctions(containerRef.current);
                        }
                        const svgElement = containerRef.current.querySelector('svg');
                        if (svgElement) {
                            svgElement.style.maxWidth = '100%';
                            svgElement.style.height = 'auto';
                        }
                        resolve();
                    } catch (callbackError) {
                        console.error("MermaidDiagram: Error processing SVG in mermaid.render callback for ID:", validDiagramId, callbackError);
                        reject(callbackError);
                    }
                });
            }).catch(renderError => {
                console.error("MermaidDiagram: Error during or after mermaid.render for ID:", validDiagramId, renderError);
                if (containerRef.current) { // Check ref one last time
                    containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error">Error rendering diagram: ${renderError.message}. Check console.</p>`;
                }
            });

          } catch (e) {
            console.error("MermaidDiagram: Synchronous error in render setup for ID:", validDiagramId, e);
            if (containerRef.current) {
              containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-setup">Error setting up render: ${e.message}. Check console.</p>`;
            }
          }
        }, 0); // setTimeout delay
      }
      // Removed the else-if block that relied on the custom `window.mermaid.isInitialized` flag.
      // The main retry logic for when mermaidInstance is not available (at the top of initializeAndRender)
      // and the direct call to initialize before render should cover initialization needs.
    };

    // Initial trigger for the rendering logic
    const tryInitAndRender = () => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') { // also check interactive
        initializeAndRender();
      } else {
        console.log("MermaidDiagram: Document not ready, deferring Mermaid initialization/render via load event.");
        window.addEventListener('load', initializeAndRender, { once: true });
      }
    };

    tryInitAndRender(); // Start the process

    return () => {
      window.removeEventListener('load', initializeAndRender);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [diagramDefinition, validDiagramId]);

  return (
    <Card
      padding="p-4"
      shadow="lg"
      rounded="lg"
      className="mermaid-diagram-container my-4 flex justify-center items-center"
    >
      <div
        key={validDiagramId}
        ref={containerRef}
        data-testid="mermaid-inner-container"
      />
    </Card>
  );
};

export default MermaidDiagram;
