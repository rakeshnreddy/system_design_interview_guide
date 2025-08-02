import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
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
    mockMermaidAPI = {
      initialize: vi.fn(),
      render: vi.fn().mockImplementation(async (id, definition) => {
        if (definition.includes('error-diagram')) {
          throw new Error('Test render error');
        }
        if (!definition) {
          return { svg: '', bindFunctions: vi.fn() };
        }
        const svgTestId = definition.includes('new-diagram') ? 'mermaid-svg-new' : 'mermaid-svg';
        return {
          svg: `<svg data-testid="${svgTestId}"></svg>`,
          bindFunctions: vi.fn(),
        };
      }),
    };
    window.mermaid = mockMermaidAPI;
  });

  afterEach(() => {
    delete window.mermaid;
  });

  test('renders Card component', () => {
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test1" />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('calls mermaid.render with diagram definition and renders SVG', async () => {
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-render" />);
    await waitFor(() => expect(mockMermaidAPI.render).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument());
  });

  test('clears previous diagram when definition changes', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-change" />);
    await waitFor(() => expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument());

    const newDefinition = 'graph LR;\nC-->D; new-diagram';
    rerender(<MermaidDiagram diagramDefinition={newDefinition} diagramId="test-change-new" />);

    await waitFor(() => {
      expect(screen.getByTestId('mermaid-svg-new')).toBeInTheDocument();
      expect(screen.queryByTestId('mermaid-svg')).not.toBeInTheDocument();
    });
  });

  test('displays error message if mermaid rendering fails', async () => {
    render(<MermaidDiagram diagramDefinition="error-diagram" diagramId="test-error" />);
    await waitFor(() => {
      expect(screen.getByText(/Error rendering diagram: Test render error. Check console./)).toBeInTheDocument();
    });
  });

  test('displays message if mermaid library is not available', async () => {
    delete window.mermaid;
    render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-no-mermaid" />);
    await waitFor(() => expect(screen.getByText('Mermaid library not available yet. Retrying...')).toBeInTheDocument());
  });

  test('clears container if diagramDefinition is empty or null', async () => {
    const { rerender } = render(<MermaidDiagram diagramDefinition={mockDiagramDefinition} diagramId="test-clear" />);
    await waitFor(() => expect(screen.getByTestId('mermaid-svg')).toBeInTheDocument());

    rerender(<MermaidDiagram diagramDefinition="" diagramId="test-clear" />);

    await waitFor(() => {
      const mermaidContainer = screen.getByTestId('mermaid-inner-container');
      expect(mermaidContainer.innerHTML).toBe('');
    });
  });
});
