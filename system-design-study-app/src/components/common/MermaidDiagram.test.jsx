import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import MermaidDiagram from './MermaidDiagram';
import { vi } from 'vitest';

// Mock the Card component
vi.mock('./Card', () => ({
  default: ({ children, ...rest }) => <div data-testid="card" {...rest}>{children}</div>
}));

describe('MermaidDiagram', () => {
  const mockDiagramDefinition = 'graph TD;\nA-->B;';
  let mockMermaidAPI;

  beforeEach(() => {
    // Reset the global mermaid object and its initialized state for each test
    mockMermaidAPI = {
      initialize: vi.fn(),
      render: vi.fn((diagramId, mermaidDefinition, callback) => {
        if (mermaidDefinition.includes("error")) {
          // Simulate error by not calling callback or throwing if appropriate
          // For now, just don't call callback to simulate a silent failure that might lead to timeout or error message in component
          // Or, to directly test error handling in component:
          // throw new Error('Simulated Mermaid Test Render Error');
          // However, the component's catch block might format this differently.
          // Let's try to make the component show its own error message.
          // The component's catch block will set innerHTML to an error message.
          // To test this, we let it throw, or make the callback throw.
          // For simplicity, if the test needs an error, it can re-mock render.
          const svgId = diagramId.replace(/-temp-svg$/, ''); // Match component's potential svg id
          callback(`<svg data-testid="${svgId.includes('new') ? 'mermaid-svg-new' : 'mermaid-svg'}"></svg>`, () => {});
          return;
        }
        // Simulate successful rendering by calling the callback with mock SVG code
        // The ID passed to the callback's SVG should match what the component expects for data-testid
        const svgId = diagramId.replace(/-temp-svg$/, ''); // Match component's potential svg id
        callback(`<svg data-testid="${svgId.includes('new') ? 'mermaid-svg-new' : 'mermaid-svg'}"></svg>`, () => {});
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
    // Check that render was called. The first argument is a generated ID for Mermaid's internal use.
    expect(mockMermaidAPI.render).toHaveBeenCalledWith(
      "mermaid-test-render-temp-svg", // The ID passed to mermaid.render
      mockDiagramDefinition,
      expect.any(Function) // The callback
    );
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument(); // data-testid in the SVG comes from the modified ID in the mock
  });

  test('clears previous diagram when definition changes', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-change" />);
    await screen.findByTestId('mermaid-svg');

    const newDefinition = 'graph LR;\nC-->D;';
    // No need to change mockImplementationOnce if the beforeEach mock is flexible enough
    // or ensure it's reset/called with new args properly if stateful.
    // The current beforeEach mock should handle this by using the ID to generate the testid.

    await act(async () => { // act might not be strictly necessary if just rerendering and checking
      rerender(<MermaidDiagram diagramDefinition={newDefinition} diagramId="test-change-new" />); // Use a new diagramId to ensure new SVG
    });

    await screen.findByTestId('mermaid-svg-new'); // Wait for the new SVG
    expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument(); // Old one should be gone
    expect(mockMermaidAPI.render).toHaveBeenCalledWith(
      "mermaid-test-change-new-temp-svg",
      newDefinition,
      expect.any(Function)
    );
  });

  test('displays error message if mermaid rendering fails', async () => {
    mockMermaidAPI.render.mockImplementationOnce((id, definition, callback) => {
      // Simulate an error being thrown by mermaid's internals or the callback
      // For the component's catch block to trigger, the error needs to happen within its try block.
      // Let's make the callback itself throw, or mermaid.render throw.
      throw new Error('Test render error');
    });

    await act(async () => { // act might not be strictly needed if error is sync
      render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-error" />);
    });
    expect(screen.getByText(/Error rendering diagram: Test render error/)).toBeInTheDocument();
  });

  test('displays message if mermaid library is not available', async () => {
    delete window.mermaid;
    // Use jest.useFakeTimers() and jest.advanceTimersByTime() if testing the setTimeout retry logic
    await act(async () => {
       render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-no-mermaid" />);
    });
    expect(screen.getByText('Mermaid library not available yet. Retrying...')).toBeInTheDocument();
  });

  test('clears container if diagramDefinition is empty or null', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-clear" />);
    await screen.findByTestId('mermaid-svg');

    await act(async () => { // act might not be strictly needed
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
