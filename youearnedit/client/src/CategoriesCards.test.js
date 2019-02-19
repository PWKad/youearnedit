import React from 'react';
import ReactDOM from 'react-dom';
import CategoriesCards from './CategoriesCards';

function noop() {}

function noopPromise() {
  return Promise.resolve();
}

describe('CategoriesCards', () => {
  let categoriesCards;

  beforeEach(() => {
    categoriesCards = new CategoriesCards({ categories: [], selectCategory() {}});
  });

  describe('getIssuesMessage()', () => {
    it('returns a singular message if only 1 issue', () => {
      const count = 1;
      const expectedMessage = '1 issue found.';

      const result = categoriesCards.getIssuesMessage(count);
      expect(result).toBe(expectedMessage);
    });

    it('returns a plural message if more than 1 issue', () => {
      const count = 2;
      const expectedMessage = '2 issues found.';

      const result = categoriesCards.getIssuesMessage(count);
      expect(result).toBe(expectedMessage);
    });

    it('returns a plural message if 0 issues', () => {
      const count = 0;
      const expectedMessage = '0 issues found.';

      const result = categoriesCards.getIssuesMessage(count);
      expect(result).toBe(expectedMessage);
    });
  });
});
