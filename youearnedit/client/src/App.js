import React, { Component } from 'react';
import './App.css';
import CategoriesCards from './CategoriesCards';
import IssuesTable from './IssuesTable';
import IssuesService from './services/issues';
import Fixtures from './resources/fixtures';

class App extends Component {
  issuesService = new IssuesService();

  state = {
    categories: [],
    issues: [],
    displayIssues: [],
    listView: false,
    selectedCategory: null
  }

  componentDidMount() {
    return this.issuesService.getIssues().then(issues => {
      this.setState({issues}, () => {
        const categories = this.issuesService.bucketIssues(Fixtures.categories, this.state.issues);
        this.setState({categories});
      });
    });
  }
  toggleViewType = () => {
    this.setState(state => ({
      listView: !state.listView,
      selectedCategory: null
    }));
    this.filterSortIssues();
  }
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category,
      listView: true
    }, () => {
      this.filterSortIssues();
    });
  }
  filterSortIssues = (sort = null) => {
    let issues;

    const selectedCategory = this.state.selectedCategory;

    if (!selectedCategory) {
      issues =  this.state.issues;
    } else {
      issues = selectedCategory.issues
    }

    if (sort) {
      issues = issues.sort((a, b) => a.comments - b.comments);

      if (sort === 'desc') { issues.reverse(); }
    }

    this.setState(state => ({displayIssues: issues}));
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Categories</h1>
          <button
            className="pure-button pure-button-primary "
            type="button"
            onClick={this.toggleViewType}>
              Show {this.state.listView ? 'Cards' : 'List'}
          </button>
          { (this.state.listView === true) ?
            <IssuesTable issues={this.state.displayIssues} filterSortIssues={this.filterSortIssues} />
            :
            <CategoriesCards categories={this.state.categories} selectCategory={this.selectCategory} />
          }
        </header>
      </div>
    );
  }
}

export default App;
