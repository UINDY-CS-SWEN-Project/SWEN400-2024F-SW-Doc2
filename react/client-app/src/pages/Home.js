import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      textDocs: [],
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username'); 
    fetch('http://localhost:9091/api/getSavedTemplates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ templates: data });
      })
      .catch((error) => {
        console.error('Error fetching templates:', error);
      });
      fetch('http://localhost:9091/api/getSavedDocuments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch text documents');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ textDocs: data });
        })
        .catch((error) => {
          console.error('Error fetching text documents:', error);
        });
  }

  handleTemplateClick = (content) => {
    localStorage.setItem('selectedData', JSON.stringify(content)); 
    window.location.href = '/editor'; 
  };
  handleDocumentClick = (content) => {
    localStorage.setItem('selectedData', JSON.stringify(content)); 
    window.location.href = '/editor'; 
  };
  handleLogout = () =>{
    localStorage.setItem('username', '');
    localStorage.setItem('isAuthenticated', false);
    window.location.replace('/login');
  }

  render() {
    const { templates } = this.state;
    const { textDocs } = this.state;

    return (
      <div className="Home">
        <header>
          <h1>Welcome</h1>
          <button className="logout-button" onClick={() => this.handleLogout()}>
            Logout
          </button>
        </header>
        <div>
          <h2>Templates</h2>
          <ul>
            {templates.length > 0 ? (
              templates.map((doc, index) => (
                <li key={index}>
                  <button
                    className="template-button"
                    onClick={() => this.handleTemplateClick(doc.content)}
                  >
                    {doc.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No templates found.</p>
            )}
          </ul>
          <h2>Documents</h2>
          <ul>
            {textDocs.length > 0 ? (
              textDocs.map((doc, index) => (
                <li key={index}>
                  <button
                    className="template-button"
                    onClick={() => this.handleDocumentClick(doc.content)}
                  >
                    {doc.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No documents found.</p>
            )}
          </ul>
        </div>
        <Link className="link" to="/editor">New Document/Template</Link>
        <Link className="link" to="/teams">Teams</Link>
        <Link className="link" to="/editteam">Edit Team</Link>
      </div>
    );
  }
}

export default Home;
