import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function noop() {}

function noopPromise() {
  return Promise.resolve();
}

describe('App', () => {
  let app;
  let spy;

  beforeEach(() => {
    app = new App();
    spy = jest.spyOn(app, 'setDisplayIssues')
      .mockImplementation(noop);
  });

  describe('filterSortIssues()', () => {
    describe('when a selectedCategory is set', () => {
      describe('and there is no sort passed in', () => {
        it('sets displayIssues to the issues with the selectedCategories', () => {
          const fakeIssues = [{test: true}];

          app.state.selectedCategory = {issues: fakeIssues};

          const result = app.filterSortIssues();

          expect(spy).toHaveBeenCalledWith(fakeIssues);
        });
      });
    });

    describe('when a selectedCategory is not set', () => {
      describe('and there is no sort passed in', () => {
        it('sets displayIssues to the full list of issues', () => {
          const fakeAllIssues = [{test: true}, {test: true}];

          app.state.selectedCategory = null;
          app.state.issues = fakeAllIssues;

          const result = app.filterSortIssues();

          expect(spy).toHaveBeenCalledWith(fakeAllIssues);
        });
      });

      describe('and there is a sort passed in', () => {
        const firstIssue = {comments: 1};
        const secondIssue = {comments: 0};
        let fakeAllIssues;

        beforeEach(() => {
          fakeAllIssues = [firstIssue, secondIssue];

          app.state.selectedCategory = null;
          app.state.issues = fakeAllIssues;
        });

        it('sorts the full list of issues by comments', () => {
          const result = app.filterSortIssues('asc');

          expect(spy).toHaveBeenCalledWith(fakeAllIssues);
          expect(fakeAllIssues[0]).toBe(secondIssue);
        });

        it('sorts the full list of issues by comments desc', () => {
          const result = app.filterSortIssues('desc');

          expect(spy).toHaveBeenCalledWith(fakeAllIssues);
          expect(fakeAllIssues[0]).toBe(firstIssue);
        });
      });
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
