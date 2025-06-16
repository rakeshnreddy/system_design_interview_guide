import { render, screen } from '@testing-library/react';
import CachepediaView from './CachepediaView';
import { cachesAppData } from '../../data/cachesAppData'; // Sample data

// Mock Chart.js and react-chartjs-2 for tests if they cause issues in JSDOM
// For now, we'll try without mocking to see if basic rendering works.
// If tests fail due to canvas or chart.js errors, mocking will be needed:
// vi.mock('react-chartjs-2', () => ({
//   Radar: () => <canvas data-testid="mocked-radar-chart" />
// }));
// vi.mock('chart.js', () => ({
//   Chart: { register: vi.fn() },
//   RadialLinearScale: vi.fn(),
//   PointElement: vi.fn(),
//   LineElement: vi.fn(),
//   Filler: vi.fn(),
//   Tooltip: vi.fn(),
//   Legend: vi.fn(),
// }));


describe('CachepediaView', () => {
  it('renders the main heading', () => {
    render(<CachepediaView appData={cachesAppData} />);
    expect(screen.getByRole('heading', { name: /Cachepedia/i })).toBeInTheDocument();
  });

  it('renders a select element for cache types', () => {
    render(<CachepediaView appData={cachesAppData} />);
    expect(screen.getByLabelText(/Select Cache Type:/i)).toBeInTheDocument();
  });

  it('renders details when a cache type is selected (first one by default)', () => {
    // The component selects the first cache type by default via useEffect
    render(<CachepediaView appData={cachesAppData} />);
    const firstCacheTypeName = Object.keys(cachesAppData.cachepedia)[0];
    expect(screen.getByRole('heading', { name: new RegExp(firstCacheTypeName, "i") })).toBeInTheDocument();
  });

  it('renders the chart area or placeholder', () => {
    const { container } = render(<CachepediaView appData={cachesAppData} />);
    // Try to find the placeholder text first
    let chartElement = screen.queryByText(/Select a cache type to view characteristics chart/i);
    if (!chartElement) {
      // If placeholder not found, look for a canvas element (often role 'img' or just 'canvas' tag)
      chartElement = container.querySelector('canvas');
    }
    expect(chartElement).toBeInTheDocument();
  });
});
