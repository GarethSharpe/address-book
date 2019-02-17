import React, { Component } from 'react';
import './FrontPage.css';
import FirebaseAPI from '../../api/firebase';
import MemberCreate from "../MemberCreate/MemberCreate";

import january from "../../assets/january.jpeg";
import february from "../../assets/february.jpeg";
import march from "../../assets/march.jpeg";
import april from "../../assets/april.jpeg";
import may from "../../assets/may.jpg";
import june from "../../assets/june.jpeg";
import july from "../../assets/july.jpeg";
import august from "../../assets/august.jpeg";
import september from "../../assets/september.jpeg";
import october from "../../assets/october.jpeg";
import november from "../../assets/november.jpeg";
import december from "../../assets/december.jpeg";
import MemberUpdate from '../MemberUpdate/MemberUpdate';
import MemberDelete from '../MemberDelete/MemberDelete';

const months = [ 
  january, february, march, april, may, june, july,
  august, september, october, november, december
]

const admins = [ "garethjsharpe@gmail.com", "steve5aiken@gmail.com" ];

class FrontPage extends Component {
  state = {
    isAdmin: false,
  }
  componentDidMount = () => {
    const currentUser = FirebaseAPI.getCurrentUser();
    admins.forEach((admin) => {
      if (currentUser.email === admin) {
        this.setState({ isAdmin: true })
      }
    });
  }
  render() {
    
    const date = new Date()
    const image = months[date.getMonth()];
    return (
      <div className="FrontPage">
        <header className="FrontPage-header" 
                style={{backgroundImage: "url(" + image + ")"}}>
          Kitchener Gospel Hall
          <header className="FrontPage-subheader">
          Address Book
        </header>
          <div className="FrontPage-button-menu">
            <MemberCreate disabled={!this.state.isAdmin} />
            <MemberUpdate disabled={!this.state.isAdmin} />
            <MemberDelete disabled={!this.state.isAdmin} />
          </div>
        </header>
      </div>
    );
  }
}

export default FrontPage;
