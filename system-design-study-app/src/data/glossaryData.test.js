import { glossaryData } from './glossaryData';

describe('glossaryData', () => {
  test('should be an array', () => {
    expect(Array.isArray(glossaryData)).toBe(true);
  });

  test('should have a significant number of terms (e.g., > 50)', () => {
    expect(glossaryData.length).toBeGreaterThan(50);
  });

  test('each entry should be an object with required string properties: term and definition', () => {
    for (const entry of glossaryData) {
      expect(typeof entry).toBe('object');
      expect(entry).not.toBeNull();

      expect(typeof entry.term).toBe('string');
      expect(entry.term.length).toBeGreaterThan(0);

      expect(typeof entry.definition).toBe('string');
      expect(entry.definition.length).toBeGreaterThan(0);

      if (entry.hasOwnProperty('details')) {
        expect(typeof entry.details === 'string' || entry.details === null).toBe(true);
        if (typeof entry.details === 'string') {
            expect(entry.details.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should be sorted alphabetically by term', () => {
    for (let i = 0; i < glossaryData.length - 1; i++) {
      // LocaleCompare for proper string comparison
      expect(glossaryData[i].term.localeCompare(glossaryData[i + 1].term)).toBeLessThanOrEqual(0);
    }
  });

  test('should not contain duplicate terms', () => {
    const terms = glossaryData.map(entry => entry.term);
    const uniqueTerms = new Set(terms);
    expect(terms.length).toBe(uniqueTerms.size);
  });

  describe('should contain definitions for key terms', () => {
    const findTerm = (termName) => glossaryData.find(entry => entry.term === termName);

    test('Cache', () => {
      const entry = findTerm('Cache');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('stores data so that future requests for that data can be served faster');
    });

    test('API (Application Programming Interface)', () => {
      const entry = findTerm('API (Application Programming Interface)');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('rules and protocols that allows different software applications to communicate');
    });

    test('Database', () => {
      const entry = findTerm('Database');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('organized collection of data');
    });

    test('Idempotency', () => {
      const entry = findTerm('Idempotency');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('making the same request multiple times produces the same result');
    });

    test('TLS (Transport Layer Security)', () => {
      const entry = findTerm('TLS (Transport Layer Security)');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('cryptographic protocol designed to provide secure communication');
      expect(entry.definition).toMatch(/SSL/i); // Check if SSL is mentioned
    });

    test('SSL (Secure Sockets Layer)', () => {
      const entry = findTerm('SSL (Secure Sockets Layer)');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('See TLS (Transport Layer Security)');
    });

    test('Thundering Herd', () => {
      const entry = findTerm('Thundering Herd');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('burst of traffic to the origin server');
      expect(entry.definition).toMatch(/Cache Stampede/i); // Check if Cache Stampede is mentioned
    });

    test('At-Least-Once Delivery', () => {
      const entry = findTerm('At-Least-Once Delivery');
      expect(entry).toBeDefined();
      expect(entry.definition).toContain('message will be delivered one or more times');
    });
  });
});
