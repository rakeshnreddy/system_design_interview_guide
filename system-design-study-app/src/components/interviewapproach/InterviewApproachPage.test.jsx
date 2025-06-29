import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import InterviewApproachPage from './InterviewApproachPage';
import { interviewApproachAppData as mockAppData } from '../../data/interviewApproachAppData';

// Mock the data import
vi.mock('../../data/interviewApproachAppData', () => ({
  interviewApproachAppData: {
    title: "System Design Interview Approach Mocked",
    sections: [
      {
        id: "introduction",
        title: "Understanding the System Design Interview Mocked",
        content: [
          { type: "paragraph", text: "This is a mocked introduction." },
        ]
      }
    ],
    mermaidDiagrams: {} // Add if Mermaid component is rendered and needs this
  }
}));

// Mock Mermaid component if it's complex or causes issues in test
vi.mock('../common/MermaidDiagram', () => ({
  default: ({ chart }) => <div data-testid="mermaid-diagram">{chart}</div>,
}));

// Mock metaUtils as they interact with document.head
vi.mock('../../utils/metaUtils', () => ({
  setMetaTag: vi.fn(),
  removeMetaTag: vi.fn(),
}));

// Mock textRenderUtils
vi.mock('../../utils/textRenderUtils.jsx', () => ({
    RenderTextWithLinks: ({ text }) => <span>{text}</span> // Simplified mock
}));


describe('InterviewApproachPage', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('renders the main title from mocked appData', () => {
    render(
      <Router>
        <InterviewApproachPage />
      </Router>
    );
    // The page uses the title prop from appData for its h1/h4
    expect(screen.getByRole('heading', { name: /System Design Interview Approach Mocked/i, level: 1 })).toBeInTheDocument();
  });

  test('renders section titles from mocked appData', () => {
    render(
      <Router>
        <InterviewApproachPage />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /Understanding the System Design Interview Mocked/i, level: 2 })).toBeInTheDocument();
  });

  test('renders content from mocked appData', () => {
    render(
      <Router>
        <InterviewApproachPage />
      </Router>
    );
    expect(screen.getByText('This is a mocked introduction.')).toBeInTheDocument();
  });
});
