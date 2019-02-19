import IssuesService from './issues';
import { Category } from '../resources/fixtures';

describe('issues', () => {
  let issuesService;
  const uncategorizedCategory = new Category({name: 'Uncategorized'});

  beforeEach(() => {
    issuesService = new IssuesService();
  });

  describe('bucketIssues()', () => {
    it('buckets the issues in to the categories', () => {
      const sut = new Category({code: 'a'});
      const dummy = new Category({code: 'b'});

      const categories = [dummy, sut, uncategorizedCategory];

      const issues = [
        { labels: [{name: 'a'}] },
        { labels: [{name: 'a'}, {name: 'b'}] },
        { labels: [{name: 'b'}] },
        { labels: [] }
      ];

      const result = issuesService.bucketIssues(categories, issues);

      expect(result.length).toBe(3);
      expect(sut.issues.length).toBe(2);
    });
  });

  describe('findUncategorizedCategory()', () => {
    it('returns the category with the name `Uncategorized`', () => {
      const categories = [{name: 'Fake'}, uncategorizedCategory];
      const result = issuesService.findUncategorizedCategory(categories);

      expect(result).toBe(uncategorizedCategory);
    });
  });
});
