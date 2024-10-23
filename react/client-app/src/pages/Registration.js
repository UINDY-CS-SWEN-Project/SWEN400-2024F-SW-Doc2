import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./RegistrationForm.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      email: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name === 'password') {
      document.getElementById(name).type = 'password';
    }

    this.setState({
      [name]: value,
    });

    document.getElementById(name).style.fontFamily = 'Montserrat black';
  };

  setEmptyValue = (event) => {
    const name = event.target.name;
    document.getElementById(name).value = "";
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    const userData = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email,
    };
  
    fetch('http://localhost:9091/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message == "User registered successfully!") {
          window.location.replace('/home');
        } 
        else if (data.message == "Username already exists!!") {
          alert("Username already exists");
        } 
        else {
          console.log('Registration failed:', data.message);
          alert("registration failed");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              required
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={this.state.name}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              required
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="password" 
              id="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              required
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="email" 
              id="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
              required
            />
          </div>
          <input type="submit" value="SIGN UP" className="btn" />
        </form>
      </div>
    );
  }
}

export default Registration;
