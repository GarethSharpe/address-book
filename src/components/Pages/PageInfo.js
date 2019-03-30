/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './PageInfo.css';

class PageInfo extends Component {
  render() {
    const { member } = this.props;
    if (!member) {
      return <p></p>
    }
    const mailTo1 = `mailto:${member.email1}`;
    const mailTo2 = `mailto:${member.email2}`;
    const homePhone = `tel:${member.phone}`;
    const cell1Matchs = member.cell1.match(/\d{3}-\d{3}-\d{4}/);
    const cell1Match = cell1Matchs ? cell1Matchs[0] : "";
    const cell2Matchs = member.cell2.match(/\d{3}-\d{3}-\d{4}/);
    const cell2Match = cell2Matchs ? cell2Matchs[0] : "";
    const cell1 = `tel:${cell1Match}`;
    const cell2 = `tel:${cell2Match}`;
    return (
      <div className="Info">
        <p className="Info-member">{member.member}</p>
        <p className="Info-other">{member.family}</p>
        <p className="Info-other">{member.address}</p>
        <p className="Info-other">{member.additional}</p>
        <p className="Info-other"><a href={mailTo1} target="_top">{member.email1}</a></p>
        <p className="Info-other"><a href={mailTo2} target="_top">{member.email2}</a></p>
        <p className="Info-other"><a href={homePhone}>{member.phone}</a></p>
        <p className="Info-other"><a href={cell1}>{member.cell1}</a></p>
        <p className="Info-other"><a href={cell2}>{member.cell2}</a></p>
      </div>
    );
  }
}

export default PageInfo;
