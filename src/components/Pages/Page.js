import React, { Component } from 'react';
import './Page.css';
import PageInfo from './PageInfo';
import * as randomColour from "random-material-color";

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
    const colour = randomColour.getColor();
    return (
      <div className="Page" style={{backgroundColor: colour}}>
        {this.createInfo(chunk)}
      </div> 
    );
  }
}

export default Page;