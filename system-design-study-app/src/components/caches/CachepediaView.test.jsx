import { render, screen } from '@testing-library/react';
import CachepediaView from './CachepediaView';
import { cachesAppData } from '../../data/cachesAppData'; // Sample data

import { vi } from 'vitest';

// Mock Chart.js and react-chartjs-2 for tests
vi.mock('react-chartjs-2', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    Radar: () => <canvas data-testid="mocked-radar-chart" />,
  };
});

// Mock Chart.js core library as well to prevent registration errors in test
vi.mock('chart.js', () => ({
  Chart: { register: vi.fn(), defaults: { color: 'grey'} }, // Added defaults.color
  RadialLinearScale: vi.fn(),
  PointElement: vi.fn(),
  LineElement: vi.fn(),
  Filler: vi.fn(),
  Tooltip: { defaults: {} }, // Mocking Tooltip with defaults
  Legend: { defaults: {} },  // Mocking Legend with defaults
}));


describe('CachepediaView', () => {
  // Manually clear mocks for ChartJS registration before each test
  // to avoid "already registered" errors if component re-renders/re-registers.
  beforeEach(async () => {
    const ChartJSMock = vi.fn().mockImplementation(() => ({
        register: vi.fn(),
        defaults: { color: 'grey'}
    }));
    const chartModule = await import('chart.js');
    vi.spyOn(chartModule, 'Chart', 'get').mockReturnValue(ChartJSMock);
  });

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
