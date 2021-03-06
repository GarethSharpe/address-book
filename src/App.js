import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/FrontPage/FrontPage';
import Pages  from './components/Pages/Pages';
import BackPage from './components/BackPage/BackPage';
import FirebaseAPI from './api/firebase';
import LoginPage from './components/LoginPage/LoginPage';
import SnackBar from "./components/SnackBar/SnackBar";

class App extends Component {
  state = { 
    members: [],
    chunks: [[]],
    isLoggedIn: false,
    invalidCredentials: false,
    errorMessage: "",
  }
  chunk = (arr, chunkSize) => {
    var r = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      r.push(arr.slice(i,i+chunkSize));
    return r;
  }
  async login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const rv = await FirebaseAPI.signIn(email.value, password.value);
    if (rv.user) { 
      this.setState({ 
        isLoggedIn: true,
        invalidCredentials: false,
       })
    } else {
      this.setState({
        invalidCredentials: true,
        errorMessage: rv.message,
      })
    }
  }
  async register() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const rv = await FirebaseAPI.createUser(email.value, password.value);
    if (rv.user) { 
      this.setState({ 
        isLoggedIn: true,
        invalidCredentials: false,
       })
    } else {
      this.setState({
        invalidCredentials: true,
        errorMessage: rv.message,
      })
    }
  }
  componentDidMount = async () => {
    const members = await FirebaseAPI.getMembers();
    members.reduce((all, one, i) => {
      const ch = Math.floor(i / 6); 
      all[ch] = [].concat((all[ch]||[]),one); 
      return all
    }, []);
    const chunks = this.chunk(members, 6);
    this.setState({
      members: members,
      chunks: chunks
    });
  }
  conditionalRender = () => {
    const app = [ ];
    if (this.state.isLoggedIn) {
      app.push(
        <FrontPage members={this.state.members} />,
        <Pages members={this.state.chunks} />,
        <BackPage />,
      )
    } else {
      app.push(
        <SnackBar message={this.state.errorMessage} open={this.state.invalidCredentials} />,
        <LoginPage login={this.login.bind(this)} register={this.register.bind(this)} />,
      )
    }
    return app;
  }
  render() {

    return (
      <div className="App">
        {this.conditionalRender()}
      </div>
    );
  }
}

export default App;
