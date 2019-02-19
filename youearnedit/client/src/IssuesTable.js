import React, { Component } from 'react';
import './IssuesTable.css';

export default class IssuesTable extends Component {
  state = {
    sort: ''
  }
  toggleCommentSort = () => {
    const sort = this.state.sort;

    if (sort === 'asc') {
      this.setSort('desc');
    } else {
      this.setSort('asc');
    }
  }
  setSort(sort) {
    this.setState({sort});

    this.props.filterSortIssues(sort);
  }
  render() {
    return (
      <table className="pure-table table">
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <button onClick={this.toggleCommentSort} className="pure-button toggle">
                Comments
                <i className={`
                  fa fa-${this.state.sort === 'asc'
                    ? 'chevron-up'
                    : this.state.sort === 'desc'
                      ? 'chevron-down'
                      : ''}`}></i>
              </button>
            </th>
            <th>User</th>
          </tr>
        </thead>

        <tbody>
          {this.props.issues.map((issue, index) =>
            <tr className={index % 2 === 0 ? 'pure-table-odd' : ''} key={issue.github_id}>
              <td>{issue.title}</td>
              <td>{issue.comments}</td>
              <td>{issue.user.login}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
