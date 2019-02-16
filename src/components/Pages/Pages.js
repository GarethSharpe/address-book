import React, { Component } from 'react';

import Page from './Page';

class Pages extends Component {
  createPages = (members) => {
    let pages = [];
    members.forEach((chunk) => {
      pages.push(<Page chunk={chunk} />);
    })
    return pages;
  }
  render() {
    const { members } = this.props
    return (
      <div>
        {this.createPages(members)}
      </div>
    )
  }
}

export default Pages;
