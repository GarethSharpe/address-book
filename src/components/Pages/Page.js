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
      "#78909c", "#607d8b", "#546e7a",
      "#455a64", "#37474f", "#263238",
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