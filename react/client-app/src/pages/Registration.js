import React, { Component } from 'react';
import "./RegistrationForm.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Username',
      password: 'Password',
      name: 'Name',
      email: 'Email',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "password") {
      document.getElementById(name).type = "password";
    }

    this.setState({
      [name]: value
    });

    document.getElementById(name).style.fontFamily = "Montserrat black";
  };

  setEmptyValue = (event) => {
    const name = event.target.name;
    document.getElementById(name).value = "";
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Submit form logic here
  };

  render() {
    return (
      <div className="Signup">
        <h4>Sign Up</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="text_area">
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={this.state.username}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={this.state.name}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="password"
              name="password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={this.state.email}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <input type="submit" value="SIGN UP" className="btn" />
        </form>
      </div>
    );
  }
}

export default Registration;
