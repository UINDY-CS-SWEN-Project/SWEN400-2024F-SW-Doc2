import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      textDocs: [],
      searchFor: '',
      filteredDocs: [],
      filteredTempls:[],
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
  handleSearchInputChange = (event) =>{
    this.setState({searchFor: event.target.value});
  }

  handleSearch = () =>{
    const {textDocs, searchFor, templates} = this.state;
    const filteredDocs = textDocs.filter((doc) => 
    doc.title.toLowerCase().includes(searchFor.toLowerCase())
    );
    const filteredTemplates = templates.filter((template) => 
      template.title.toLowerCase().includes(searchFor.toLowerCase())
      );
    this.setState({
      filteredDocs: filteredDocs,
      filteredTempls: filteredTemplates,
    });
  }

  render() {
    const { templates, textDocs, searchFor, filteredDocs, filteredTempls } = this.state;
    

    return (
      <div className="Home">
        <header>
          <h1>Welcome</h1>
          <button className="logout-button" onClick={() => this.handleLogout()}>
            Logout
          </button>
        </header>
        <div>
          <h2>Search By Title (Documents and Templates)</h2>
          <input 
            type = "text"
            name = "TitleSearch"
            value={searchFor}
            onChange={this.handleSearchInputChange}
            placeholder="Enter title to search for"
          />
          <button className="DocSearchBtn" onClick={this.handleSearch}>Search</button>
          <h2>Search Results</h2>
          <ul>
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, index) => (
                <li key={index}>
                  <button
                    className="template-button"
                    onClick={() => this.handleDocumentClick(doc.content)}
                  >
                    {doc.title}
                  </button>
                </li>
              ))
            ):(
              <p>No matching documents found.</p>
            )}

            {filteredTempls.length > 0 ? (
              filteredTempls.map((template, index) => (
                <li key={index}>
                  <button
                    className="template-button"
                    onClick={() => this.handleDocumentClick(template.content)}
                  >
                    {template.title}
                  </button>
                </li>
              ))
            ):(
              <p>No matching templates found.</p>
            )}
            
          </ul>
          <h2>All Templates</h2>
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
          <h2>All Documents</h2>
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
        <Link className="link" to="/editor" name="NewDocLink">New Document/Template</Link>
        <Link className="link" to="/teams" name="TeamLink">Teams</Link>
        <Link className="inlinelink" to="/viewteams" name="ViewTeamLink">View/Edit Teams</Link>
      </div>
    );
  }
}

export default Home;
