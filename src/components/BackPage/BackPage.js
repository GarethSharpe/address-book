import React, { Component } from 'react';
import './BackPage.css';

import space from "../../assets/space.jpeg";
import mountain from "../../assets/montain.jpeg";
import background from "../../assets/bg7.jpg";
import water from "../../assets/water.jpeg";

const images = [ space, mountain, background, water ];

class BackPage extends Component {
  render() {
    const image = images[Math.floor(Math.random() * images.length)];
    return (
      <div className="BackPage">
        <header className="BackPage-header"
                style={{backgroundImage: "url(" + image + ")"}}>
          <header className="BackPage-subheader">
          Address Book
        </header>
        </header>
      </div>
    );
  }
}

export default BackPage;
