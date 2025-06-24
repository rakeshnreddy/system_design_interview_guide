import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import MermaidDiagram from './MermaidDiagram';
import { vi } from 'vitest';

// Mock the Card component
vi.mock('./Card', () => ({ children, ...rest }) => <div data-testid="card" {...rest}>{children}</div>);

describe('MermaidDiagram', () => {
  const mockDiagramDefinition = 'graph TD;\nA-->B;';
  let mockMermaidAPI;

  beforeEach(() => {
    // Reset the global mermaid object and its initialized state for each test
    mockMermaidAPI = {
      initialize: vi.fn(),
      render: vi.fn((id, definition, callback) => {
        // Simulate successful rendering by calling the callback with mock SVG code
        callback('<svg data-testid="mermaid-svg"></svg>');
      }),
      isInitialized: false, // Ensure this is reset
    };
    window.mermaid = mockMermaidAPI;
  });

  afterEach(() => {
    // Clean up the global mermaid object
    delete window.mermaid;
    // Clean up any temporary divs that might be left in the body from tests
    const tempElements = document.querySelectorAll('[id^="render-temp-mermaid-"]');
    tempElements.forEach(el => el.remove());
  });

  test('renders Card component', () => {
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test1" />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('initializes Mermaid if not already initialized', () => {
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-init" />);
    expect(mockMermaidAPI.initialize).toHaveBeenCalledWith({
      startOnLoad: false,
      theme: 'default',
    });
    expect(mockMermaidAPI.isInitialized).toBe(true);
  });

  test('does not re-initialize Mermaid if already initialized', () => {
    window.mermaid.isInitialized = true; // Simulate already initialized
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-no-reinit" />);
    expect(mockMermaidAPI.initialize).not.toHaveBeenCalled();
  });

  test('calls mermaid.render with diagram definition and renders SVG', async () => {
    await act(async () => {
      render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-render" />);
    });
    // Check that render was called. The first argument is a generated ID.
    expect(mockMermaidAPI.render).toHaveBeenCalledWith(
      expect.stringContaining('render-temp-mermaid-test-render'), // Or a more generic matcher if ID is random
      mockDiagramDefinition,
      expect.any(Function)
    );
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();
  });

  test('clears previous diagram when definition changes', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-change" />);
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();

    const newDefinition = 'graph LR;\nC-->D;';
    mockMermaidAPI.render.mockImplementationOnce((id, definition, callback) => {
      callback('<svg data-testid="mermaid-svg-new"></svg>');
    });

    await act(async () => {
      rerender(<MermaidDiagram diagramDefinition={newDefinition} diagramId="test-change" />);
    });

    expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
    expect(screen.getByTestId('mermaid-svg-new')).toBeInTheDocument();
    expect(mockMermaidAPI.render).toHaveBeenCalledWith(
      expect.stringContaining('render-temp-mermaid-test-change'),
      newDefinition,
      expect.any(Function)
    );
  });

  test('displays error message if mermaid rendering fails', async () => {
    mockMermaidAPI.render.mockImplementationOnce((id, definition, callback) => {
      throw new Error('Test render error');
    });
    await act(async () => {
      render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-error" />);
    });
    expect(screen.getByText(/Error rendering diagram: Test render error/)).toBeInTheDocument();
  });

  test('displays message if mermaid library is not available', () => {
    delete window.mermaid; // Simulate mermaid not loaded
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-no-mermaid" />);
    expect(screen.getByText('Mermaid library not available yet. Waiting for CDN...')).toBeInTheDocument();
  });

  test('clears container if diagramDefinition is empty or null', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-clear" />);
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();

    await act(async () => {
      rerender(<MermaidDiagram diagramDefinition="" diagramId="test-clear" />);
    });
    expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();

    await act(async () => {
      rerender(<MermaidDiagram diagramDefinition={null} diagramId="test-clear" />);
    });
    expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
  });

   test('handles cases where containerRef might become null during async rendering (though unlikely with normal flow)', async () => {
    const { unmount } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-unmount" />);

    mockMermaidAPI.render.mockImplementationOnce((id, definition, callback) => {
      // Simulate unmount before callback
      unmount();
      // Callback is called after unmount, containerRef.current would be null
      // We are testing that this doesn't throw an error inside the callback
      expect(() => callback('<svg></svg>')).not.toThrow();
    });

    // Re-trigger useEffect by changing a prop; this is a bit artificial for this exact scenario
    // but helps simulate the async nature if render was delayed.
    // In a real scenario, the component unmounting during an async mermaid.render callback is the concern.
    await act(async () => {
       render(<MermaidDiagram diagramDefinition={mockDiagramDefinition + " "} diagramId="test-unmount" />);
    });
    // No explicit assertion needed other than not throwing, which is covered by the expect in mock.
  });


});
