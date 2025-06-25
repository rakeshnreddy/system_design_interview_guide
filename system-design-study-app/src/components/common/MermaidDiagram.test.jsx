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
    vi.useFakeTimers(); // Use fake timers for all tests in this suite
    mockMermaidAPI = {
      initialize: vi.fn(),
      render: vi.fn((renderId, definition, callback) => {
        // The component passes validDiagramId + "-temp-svg" as renderId
        // The testid in the svg should be based on validDiagramId without the suffix.
        // For simplicity in the mock, we'll use a generic 'mermaid-svg' or 'mermaid-svg-new'
        // and ensure the tests look for these specific testids.
        let svgTestId = 'mermaid-svg';
        if (renderId.includes('test-change-new')) { // Specific for the rerender test case
            svgTestId = 'mermaid-svg-new';
        }
         // Simulate error condition for the error test
        if (definition.includes("error-diagram")) { // Use a specific string to trigger error
            throw new Error('Test render error');
        }
        callback(`<svg data-testid="${svgTestId}"></svg>`, vi.fn());
      }),
      isInitialized: false,
    };
    window.mermaid = mockMermaidAPI;
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers after each test
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
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-render" />);
    // useEffect runs, schedules setTimeout.
    // Advance timers to execute the setTimeout callback.
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    // Now the callback should have executed, including mockMermaidAPI.render
    // Check that render was called. The first argument is the dynamically generated ID.
    // The component generates an ID like `mermaid-${diagramId}-temp-svg` for the render call.
    expect(mockMermaidAPI.render).toHaveBeenCalledWith(
      `mermaid-test-render-temp-svg`,
      mockDiagramDefinition,
      expect.any(Function)
    );
    expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument();
  });

  test('clears previous diagram when definition changes', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-change" />);
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve(); // Flush microtasks
    });
    await screen.findByTestId('mermaid-svg'); // Ensure initial SVG is rendered

    const newDefinition = 'graph LR;\nC-->D;';
    // The mock in beforeEach is now designed to handle 'new' in the ID for testid

    rerender(<MermaidDiagram diagramDefinition={newDefinition} diagramId="test-change-new" />);
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve(); // Flush microtasks
    });

    await waitFor(() => {
      expect(screen.getByTestId('mermaid-svg-new')).toBeInTheDocument();
      expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
    });
    expect(mockMermaidAPI.render).toHaveBeenLastCalledWith( // Check the last call specifically
      `mermaid-test-change-new-temp-svg`,
      newDefinition,
      expect.any(Function)
    );
  });

  test('displays error message if mermaid rendering fails', async () => {
    render(<MermaidDiagram diagramDefinition="error-diagram" diagramId="test-error" />);
    await act(async () => {
      vi.runOnlyPendingTimers(); // Advance timers to execute setTimeout containing render logic
    });
    // Updated matcher to be more flexible and match the actual async error message format
    expect(screen.getByText((content, element) =>
      content.startsWith('Error rendering diagram (async):') &&
      content.includes('Test render error') &&
      content.endsWith('. Check console.')
    )).toBeInTheDocument();
  });

  test('displays message if mermaid library is not available', async () => {
    delete window.mermaid;
    vi.useFakeTimers(); // Use fake timers for setTimeout
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-no-mermaid" />);
    expect(screen.getByText('Mermaid library not available yet. Retrying...')).toBeInTheDocument();

    // Fast-forward timers to see if retry message persists or changes (though current logic doesn't change it)
    await act(async () => {
        vi.advanceTimersByTime(500);
    });
    expect(screen.getByText('Mermaid library not available yet. Retrying...')).toBeInTheDocument();
    vi.useRealTimers(); // Restore real timers
  });

  test('clears container if diagramDefinition is empty or null', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-clear" />);
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve(); // Flush microtasks
    });
    await screen.findByTestId('mermaid-svg'); // Wait for initial render

    // Test with empty string
    rerender(<MermaidDiagram diagramDefinition="" diagramId="test-clear" />);
    // useEffect for empty definition is synchronous, but let's flush any potential old timers/promises.
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
      const mermaidContainer = screen.getByTestId('mermaid-inner-container');
      expect(mermaidContainer.innerHTML).toBe('');
    });
    expect(screen.queryByText('Mermaid library not available yet. Retrying...')).toBeNull();


    // Test with null
    // Re-render with the original definition first to ensure mermaid-svg is back
    rerender(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-clear-again" />);
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve();
    });
    await screen.findByTestId('mermaid-svg'); // Make sure it rendered again

    // Test with null
    rerender(<MermaidDiagram diagramDefinition={null} diagramId="test-clear-again" />);
    await act(async () => {
      vi.runOnlyPendingTimers();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
      const mermaidContainerAfterNull = screen.getByTestId('mermaid-inner-container');
      expect(mermaidContainerAfterNull.innerHTML).toBe('');
    });
    expect(screen.queryByText('Mermaid library not available yet. Retrying...')).toBeNull();
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
