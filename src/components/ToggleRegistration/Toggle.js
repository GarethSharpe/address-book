

import React, { Component } from 'react';
import Switch from "react-switch";
import FirebaseAPI from "../../api/firebase";
import "./Toggle.css";

class Toggle extends Component {
	state = {
		isSwitched: false,
	}

	componentDidMount = async () => {
    const registrationOpen = await FirebaseAPI.isRegistrationOpen();
    this.setState({ isSwitched: registrationOpen });
  }
  handleChange = async (isSwitched) => {
    this.setState({ isSwitched });
    await FirebaseAPI.toggleRegistration(isSwitched);
  }
  render() {
    return (
      <div className="switch-div">
      <Switch
        checked={this.state.isSwitched}
        onChange={this.handleChange.bind(this)}
        onColor="#3f51b5"
        onHandleColor="##3f51b5"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
      </div>
    )
  }
}

export default Toggle;