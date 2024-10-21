import React, { Component } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password',
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
    document.getElementById(name).value = '';
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email
    };

    fetch('http://localhost:9091/api/authorizeUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.success) {  
        window.location.replace('/home');
      } else {
        console.log('Login Failed:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  render() {
    return (
      <div className="Login">
        <h4>Sign In</h4>
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
              id="password"
              name="password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <input type="submit" value="SIGN IN" className="btn" />
        </form>
        <Link className="link" to="/registration">Sign Up</Link>
      </div>
    );
  }
}

const Home = () => { 
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Login;