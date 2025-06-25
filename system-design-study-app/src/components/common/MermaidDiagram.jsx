import React, { useEffect, useRef } from 'react';
import Card from './Card'; // Import the Card component

const MermaidDiagram = ({ diagramDefinition, diagramId }) => {
  const containerRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const validDiagramId = `mermaid-${diagramId || Math.random().toString(36).substring(7)}`;

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

      let currentIsInitializedState = mermaidInstance.isInitialized;

      if (typeof mermaidInstance.initialize === 'function' && !currentIsInitializedState) {
        try {
          console.log("MermaidDiagram: Initializing Mermaid...");
          mermaidInstance.initialize({ startOnLoad: false, theme: 'default' });
          mermaidInstance.isInitialized = true; // Set custom flag
          currentIsInitializedState = true; // Update for current execution flow
          console.log("MermaidDiagram: Mermaid initialized.");
        } catch (e) {
          console.error("MermaidDiagram: Error initializing Mermaid:", e);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-red-500">Failed to initialize Mermaid: ${e.message}</p>`;
          }
          return; // Stop if initialization fails
        }
      }

      // Proceed to render if initialized (either previously or just now) and other conditions are met
      if (currentIsInitializedState && containerRef.current && diagramDefinition) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
          if (!containerRef.current) {
            console.log("MermaidDiagram: Render deferred but component unmounted for ID:", validDiagramId);
            return;
          }
          containerRef.current.innerHTML = ''; // Clear just before rendering

          try {
            console.log(`MermaidDiagram: Deferred rendering diagram for ID: ${validDiagramId}`);
            const renderPromise = new Promise((resolve, reject) => {
              mermaidInstance.render(validDiagramId + "-temp-svg", diagramDefinition, (svgCode, bindFunctions) => {
                try {
                  if (containerRef.current) {
                    containerRef.current.innerHTML = svgCode;
                    if (bindFunctions) bindFunctions(containerRef.current);
                    const svgElement = containerRef.current.querySelector('svg');
                    if (svgElement) {
                      svgElement.style.maxWidth = '100%';
                      svgElement.style.height = 'auto';
                    }
                    resolve();
                  } else {
                    console.warn("MermaidDiagram: Container ref became null during deferred render callback for ID:", validDiagramId);
                    reject(new Error("Container ref became null during deferred render callback."));
                  }
                } catch (innerError) {
                  console.error("MermaidDiagram: Error processing SVG in callback for ID:", validDiagramId, innerError);
                  reject(innerError);
                }
              });
            });

            renderPromise.catch(e => {
              console.error("MermaidDiagram: Error during or after deferred mermaid.render (async) for ID:", validDiagramId, e);
              if (containerRef.current) {
                containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-async">Error rendering diagram (async): ${e.message}. Check console.</p>`;
              }
            });
          } catch (e) {
            console.error("MermaidDiagram: Synchronous error in deferred render setup for ID:", validDiagramId, e);
            if (containerRef.current) {
              containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-sync">Error setting up render: ${e.message}. Check console.</p>`;
            }
          }
        }, 0);
      } else if (containerRef.current && mermaidInstance && !currentIsInitializedState) {
         // This condition means mermaidInstance exists but our custom isInitialized flag is false.
         // This might happen if initialization was attempted but failed silently or was reset.
         // The retry for !mermaidInstance should handle cases where mermaid itself is gone.
         containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library present but not initialized. Retrying initialization...</p>`;
         clearTimeout(timeoutIdRef.current);
         mermaidInstance.isInitialized = false; // Force re-initialization attempt
         timeoutIdRef.current = setTimeout(initializeAndRender, 500);
      }
      // If diagramDefinition is null/empty, it's handled by the initial check in useEffect.
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
