import React, { Component } from 'react';
import './Page.css';
import PageInfo from './PageInfo';

class Page extends Component {

  createInfo = (chunk) => {
    const info = [];
    let i = 0;
    while (i < chunk.length) {
      info.push(
      <div className="Page-container">
        <PageInfo key={i} member={chunk[i++]} />
        <PageInfo key={i} member={chunk[i++]} />
      </div>
      );
    }
    return info;
  }

  render() {;
    const { chunk } = this.props;
    const colours = [
      "#f44336", "#9c27b0", "#673ab7", "#3f51b5",
      "#009688", "#4caf50", "#ff9800", "#ff5722",
      "#9e9e9e", "#607d8b", "#cddc39", "#2196f3",
    ]
    const colour = colours[Math.floor(Math.random() * colours.length)];
    return (
      <div className="Page" style={{backgroundColor: colour}}>
        {this.createInfo(chunk)}
      </div> 
    );
  }
}

export default Page;