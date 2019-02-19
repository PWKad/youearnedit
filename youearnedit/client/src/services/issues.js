import axios from 'axios';

export class Issue {
  github_id = '';
  node_id = '';
  url = '';
  repository_url = '';
  comments_url = '';
  number = '';
  state = '';
  title = '';
  body = '';
  locked = '';
  active_lock_reason = '';
  comments = '';
  closed_at = '';

  user;
  labels = [];

  constructor(data) {
    Object.assign(this, data);
  }
}

export default class IssuesService {
  getIssues() {
    return axios.get(`/issues.json`).then(result => {
      return result.data.map(issue => new Issue(issue));
    });
  }
  bucketIssues(categories, issues) {
    let categoryMap = {};

    categories.forEach(category => {
      categoryMap[category.code] = category;
    });

    const uncategorizedCategory = this.findUncategorizedCategory(categories);

    issues.forEach(issue => {
      issue.labels.forEach(label => {
        const matchingCategory = categoryMap[label.name];

        if (!matchingCategory) {
          uncategorizedCategory.issues.push(issue);
        } else {
          matchingCategory.issues.push(issue);
        }
      });
    });

    return categories;
  }
  findUncategorizedCategory(categories) {
    return categories.find(category => category.name === 'Uncategorized');
  }
}
