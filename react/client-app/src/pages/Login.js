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
    // Form submit logic here
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

const Home = () => { // Changed to "Home"
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Login; // Exporting only the Login class component
