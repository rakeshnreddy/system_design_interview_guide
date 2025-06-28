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
      // We will ensure initialization happens right before rendering inside the timeout as well for robustness.
      if (containerRef.current && diagramDefinition) { // Simplified condition here, main checks inside timeout
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
          if (!containerRef.current) { // Check again as component might have unmounted
            console.log("MermaidDiagram: Render deferred but component unmounted for ID:", validDiagramId);
            return;
          }
          containerRef.current.innerHTML = ''; // Clear just before rendering

          const mermaidInstanceForRender = window.mermaid; // Re-fetch in case it changed, though unlikely in setTimeout(0)
          if (!mermaidInstanceForRender) {
            console.error("MermaidDiagram: Mermaid instance disappeared before deferred render for ID:", validDiagramId);
            if (containerRef.current) {
                containerRef.current.innerHTML = `<p class="text-red-500">Mermaid library instance lost.</p>`;
            }
            return;
          }

          try {
            // Ensure Mermaid is initialized right before rendering in this specific execution context
            // This helps if the global/window.mermaid state was altered or if multiple instances interfere
             mermaidInstanceForRender.initialize({ startOnLoad: false, theme: 'default' }); // Adjust theme as needed
            // console.log(`MermaidDiagram: Re-initialized Mermaid for render ID: ${validDiagramId}`);

            console.log(`MermaidDiagram: Deferred rendering diagram for ID: ${validDiagramId}`);
            // Using a promise wrapper to better handle errors from the render callback itself
            new Promise((resolve, reject) => {
                mermaidInstanceForRender.render(validDiagramId + "-svg-temp", diagramDefinition, (svgCode, bindFunctions) => {
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
      } else if (containerRef.current && window.mermaid && !window.mermaid.isInitialized && diagramDefinition) {
        // This was the original retry logic if mermaid was present but not marked as initialized by our custom flag.
        // The new approach calls initialize within the setTimeout before render, which might be more robust.
        // Keeping a general retry if mermaid exists but something seems off.
        console.warn("MermaidDiagram: Mermaid instance found, but custom isInitialized flag is false. Retrying full init/render for ID:", validDiagramId);
        clearTimeout(timeoutIdRef.current);
        if(window.mermaid) window.mermaid.isInitialized = false; // Reset custom flag to ensure re-attempt if initializeAndRender is called
        timeoutIdRef.current = setTimeout(initializeAndRender, 250); // Shorter retry
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
