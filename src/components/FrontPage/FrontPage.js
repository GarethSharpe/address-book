import React, { Component } from 'react';
import './FrontPage.css';
import FirebaseAPI from '../../api/firebase';
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
import MemberCreate from "../MemberCreate/MemberCreate";
import MemberUpdate from '../MemberUpdate/MemberUpdate';
import MemberDelete from '../MemberDelete/MemberDelete';
import MemberSelfServe from '../MemberSelfServe/MemberSelfServe';
import AdminCreate from "../AdminCreate/AdminCreate";
import ToggleRegistraion from "../ToggleRegistration/Toggle";

const months = [ 
  january, february, march, april, may, june, july,
  august, september, october, november, december
]

class FrontPage extends Component {
  state = {
    isAdmin: false,
    isInDirectory: false,
    member: { },
  }
  getAdminPanel = (members) => {
    const adminPanel = [ ];
    if (this.state.isAdmin) {
      adminPanel.push(
        <MemberCreate />,
        <MemberUpdate members={members} />,
        <MemberDelete members={members} />,
        <AdminCreate />,
        <ToggleRegistraion />
      )
    }
    return adminPanel;
  }
  getSelfServePanel = () => {
    const selfServePanel = [ ];
    if (!this.state.isAdmin && this.state.isInDirectory) {
      selfServePanel.push(
        <MemberSelfServe member={this.state.member} />
      )
    }
    return selfServePanel;
  }
  componentDidMount = async () => {
    const currentUser = FirebaseAPI.getCurrentUser();
    const admins = await FirebaseAPI.getAdmins();
    admins.forEach((admin) => {
      if (currentUser.email === admin) {
        this.setState({ isAdmin: true });
      }
    });
    this.props.members.forEach((member) => {
      if (member.email1 === currentUser.email || member.email2 === currentUser.email) {
        this.setState({
          isInDirectory: true,
          member,
        });
        return;
      }
    })
  }
  render() {
    const { members } = this.props;
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
            {this.getAdminPanel(members)}
            {this.getSelfServePanel()}
          </div>
        </header>
      </div>
    );
  }
}

export default FrontPage;
