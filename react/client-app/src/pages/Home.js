import React, { Component } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password',
    };
  }

  getTeams = (event) => {

  }

  getDocuments = (event) => {
    
  }

  render() {
    return (
      <div className="Home">
        <header>
          <h1>Welcome</h1>
        </header>
        <body>
          <text>
            Teams:
            <br></br>
          </text>
          <div className="text_area">
          </div>
          <Link className="link" to="/teams">Add Team</Link>
          <br></br>
          <text>
            Documents:
            <br></br>
          </text>
          <div className="text_area">
          </div>
          <Link className="link" to="/editor">Document Editor</Link>
        </body>
      </div>
    );
  }
}

// const Home = () => {
//   return (
//     <div>home</div>
//   )
// }

export default Home