import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./ViewTeams.css";

class ViewTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      userTeams: [],
      teamName: '',
      userNameToRemove: '',
    };
  }

  componentDidMount() {
    this.getTeams();
  }
  getTeams = () => {
  const userID = localStorage.getItem('username');

  
  const dataToSend = {
    username: userID,
  }

  console.log(JSON.stringify(dataToSend)); 
  fetch('http://localhost:9091/api/getTeams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error getting teams!');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ userTeams: data });
    })
    .catch((error) => {
      console.error(error.message);
      this.setState({ userTeams: [] });
    });
    };

    handleInputChange = (event) => {
        const target = event.target;
        let value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
        document.getElementById(name).style.fontFamily = 'Montserrat black';
      };
    
    
      handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            teamName: this.state.teamName,
            membtoRemoveName: this.state.userNameToRemove,
        }
        fetch('http://localhost:9091/api/removeUserFromTeam', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
            if (data.message === "User successfully removed from team.") {
                alert("User removed succesfully");
            } 
            else if (data.message === "No teams are created!") {
                alert("There are no teams created!");
            }
            else if (data.message === "No members in this team!") {
                alert("No members in this team!");
            }
            else if (data.message === "User not found in team!") {
                alert("User not found in team!");
            }
            else if (data.message === "Team not found!") {
                alert("Team not found!");
            }
            else if (data.message === "User successfully removed from team & team is deleted.") {
                alert("User successfully removed from team & team is deleted!");
            }
            else {
                console.log('Removal failed:', data.message);
                alert("Removal failed");
            }
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            window.location.replace('/viewteams');
          }
        

  render() {
    return (
      <div className="ViewTeams">
        <h4>All Teams</h4>
        <div className="text_area_special">
            {this.state.userTeams.length > 0 ? (
              <ul>
                {this.state.userTeams.map((team, index) => (
                  <li key={index}>{'TEAM NAME: '}{team.teamName} {'USERS: '}{team.MembsUserName.join(' ')}</li>
                ))}
              </ul>
            ) : (
              <p>No teams available.</p>
            )}
          </div>
          <h4>Remove A Member From A Team</h4>
            <form onSubmit={this.handleSubmit}>
            <div className="text_area">
                <input
                type="text"
                id="teamName"
                name="teamName"
                value={this.state.teamName}
                onChange={this.handleInputChange}
                required
                placeholder="Enter Team Name"
                />
            </div>
            <div className="text_area">
                <input
                type="text"
                id="userNameToRemove"
                name="userNameToRemove"
                value={this.state.userNameToRemove}
                onChange={this.handleInputChange}
                placeholder="Enter Team Member Username"
                />
            </div>
            <div>
            </div>
            <input type="submit" value="Remove Member" className="btn" name="removeMember"/>
            </form>
        </div>
    );
  }
}

export default ViewTeams;
