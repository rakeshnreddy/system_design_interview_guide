import '@testing-library/jest-dom';

// Mock HTMLCanvasElement.prototype.getContext for tests involving Chart.js or other canvas usage
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = function (contextId, ...args) {
    if (contextId === '2d') {
      // Return a mock 2D context
      return {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn((x, y, sw, sh) => ({
          data: new Uint8ClampedArray(sw * sh * 4),
        })),
        putImageData: vi.fn(),
        createImageData: vi.fn(() => ({ data: [] })),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(() => ({ width: 0, actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 })),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
        // Add other 2D context methods if your tests/components use them
      };
    }
    // Return null for other contexts like 'webgl' if not needed, or a more specific mock
    return null;
  };
}

// Mock for matchMedia, often used by UI libraries for responsive design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
