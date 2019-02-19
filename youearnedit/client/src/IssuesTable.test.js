import React from 'react';
import ReactDOM from 'react-dom';
import IssuesTable from './IssuesTable';

function noop() {}

function noopPromise() {
  return Promise.resolve();
}

describe('IssuesTable', () => {
  let issuesTable;
  let spy;

  beforeEach(() => {
    issuesTable = new IssuesTable({ issues: [] });
    spy = jest.spyOn(issuesTable, 'setSort')
      .mockImplementation(noop);
  });

  describe('toggleCommentSort()', () => {
    describe('when sort is currently ascending', () => {
      it('sets sort to descending', () => {
        issuesTable.state.sort = 'asc';

        const expectedResult = 'desc';

        const result = issuesTable.toggleCommentSort();

        expect(spy).toHaveBeenCalledWith(expectedResult);
      });
    });

    describe('when sort is null', () => {
      it('sets sort to ascending', () => {
        issuesTable.state.sort = null;

        const expectedResult = 'asc';

        const result = issuesTable.toggleCommentSort();

        expect(spy).toHaveBeenCalledWith(expectedResult);
      });
    });

    describe('when sort is descending', () => {
      it('sets sort to ascending', () => {
        issuesTable.state.sort = 'desc';

        const expectedResult = 'asc';

        const result = issuesTable.toggleCommentSort();

        expect(spy).toHaveBeenCalledWith(expectedResult);
      });
    });
  });
});
