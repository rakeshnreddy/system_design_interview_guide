import React, { useEffect, useRef, useMemo } from 'react';
import Card from './Card';

// Global flag to ensure Mermaid is initialized only once per app lifecycle
let globalMermaidInitialized = false;

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

    const performRender = () => {
      if (!containerRef.current) {
        console.log("MermaidDiagram: Render deferred but component unmounted for ID:", validDiagramId);
        return;
      }
      containerRef.current.innerHTML = '';

      const mermaidInstance = window.mermaid;

      // Initialize Mermaid globally only once.
      if (!globalMermaidInitialized && typeof mermaidInstance.initialize === 'function') {
        try {
          mermaidInstance.initialize({ startOnLoad: false, theme: 'default' });
          globalMermaidInitialized = true;
          console.log("MermaidDiagram: Mermaid initialized globally for the first time.");
        } catch (initError) {
          console.error("MermaidDiagram: Error during global initialization:", initError);
          if (containerRef.current) {
              containerRef.current.innerHTML = `<p class="text-red-500">Error initializing Mermaid globally.</p>`;
          }
          return;
        }
      } else if (!globalMermaidInitialized && !(mermaidInstance && typeof mermaidInstance.initialize === 'function')) {
          // Added check for mermaidInstance existence before typeof
          console.warn("MermaidDiagram: Global init skipped as mermaidInstance.initialize not ready or mermaidInstance not fully available.");
      }

      try {
        console.log(`MermaidDiagram: Deferred rendering diagram for ID: ${validDiagramId}`);

        new Promise((resolve, reject) => {
          const tempRenderId = `m${Date.now()}${Math.random().toString(16).slice(2)}`;
          mermaidInstance.render(tempRenderId, diagramDefinition, (svgCode, bindFunctions) => {
              if (!containerRef.current) {
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
            if (containerRef.current) {
                containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error">Error rendering diagram: ${renderError.message}. Check console.</p>`;
            }
        });
      } catch (e) {
        console.error("MermaidDiagram: Synchronous error in render setup for ID:", validDiagramId, e);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-500" data-testid="mermaid-error-setup">Error setting up render: ${e.message}. Check console.</p>`;
        }
      }
    };

    const setupAndRender = () => {
      if (window.mermaid && typeof window.mermaid.initialize === 'function' && typeof window.mermaid.render === 'function') {
        timeoutIdRef.current = setTimeout(performRender, 0);
      } else {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-orange-500">Mermaid library not available yet. Retrying...</p>`;
        }
        timeoutIdRef.current = setTimeout(setupAndRender, 100);
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setupAndRender();
    } else {
        console.log("MermaidDiagram: Document not ready, deferring Mermaid setup/render via load event.");
        const loadHandler = () => {
            console.log("MermaidDiagram: Document loaded, proceeding with Mermaid setup.");
            setupAndRender();
        };
        window.addEventListener('load', loadHandler, { once: true });
        return () => {
            window.removeEventListener('load', loadHandler);
            clearTimeout(timeoutIdRef.current);
        };
    }

    return () => {
      clearTimeout(timeoutIdRef.current);
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
        key={validDiagramId} // React key
        id={validDiagramId} // HTML id for potential direct targeting if needed, though current logic uses ref
        ref={containerRef}
        data-testid="mermaid-inner-container"
      />
    </Card>
  );
};

export default MermaidDiagram;
