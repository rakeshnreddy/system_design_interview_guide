import { databasesAppData } from './databasesAppData';

describe('databasesAppData', () => {
  it('should have a comparisonData object for sql-vs-nosql', () => {
    expect(databasesAppData.comparisonData).toBeDefined();
    expect(databasesAppData.comparisonData['sql-vs-nosql']).toBeDefined();
    expect(databasesAppData.comparisonData['sql-vs-nosql'].title).toBe('Relational vs NoSQL Trade-offs');
    expect(databasesAppData.comparisonData['sql-vs-nosql'].features.length).toBe(5);
  });

  it('should have a terminology entry for NewSQL', () => {
    const newsqlTerm = databasesAppData.terminology.find(term => term.id === 'newsql');
    expect(newsqlTerm).toBeDefined();
    expect(newsqlTerm.title).toBe('NewSQL');
  });
});
