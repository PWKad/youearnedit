import React, { Component } from 'react';
import './CategoriesCards.css';

export default class CategoriesCards extends Component {
  getIssuesMessage(count) {
    return `${count} issue${count === 1 ? '' : 's'} found.`;
  }
  render() {
    return (
      <div className="categories-cards">
        {this.props.categories.map((category, index) =>
          <button
              onClick={() => { this.props.selectCategory(category); }}
              href="#"
              className={`card pure-u-1 pure-u-md-1-3 color-${index}`}
              key={category.code}>
            <strong className="pure-u-1">{category.name}</strong>
            <span className="pure-u-1-2">{this.getIssuesMessage(category.issues.length)}</span>
          </button>
        )}
      </div>
    )
  }
}
