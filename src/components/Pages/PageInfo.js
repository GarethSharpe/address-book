import React, { Component } from 'react';
import './PageInfo.css';

class PageInfo extends Component {
  render() {
    const { member } = this.props;
    if (!member) {
      return <p></p>
    }
    return (
      <div className="Info">
        <p className="Info-member">{member.member}</p>
        <p className="Info-other">{member.family}</p>
        <p className="Info-other">{member.address}</p>
        <p className="Info-other">{member.additional}</p>
        <p className="Info-other">{member.email1}</p>
        <p className="Info-other">{member.email2}</p>
        <p className="Info-other">{member.home}</p>
        <p className="Info-other">{member.cell1}</p>
        <p className="Info-other">{member.cell2}</p>
      </div>
    );
  }
}

export default PageInfo;
