import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Teams.css";

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      userTeams: [],
      teamName: '',
      teamMembs: [],
      teamMembsPermission: [],
      userNameToRemove: '',
    };
  }

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

    if (event.nativeEvent.submitter.name === 'viewTeam') {
        alert("TODO");// TODO implement avery's view team
      } else if (event.nativeEvent.submitter.name === 'removeMember'){
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
      }
    }

  render() {
    return (
      <div className="Teams">
        <h4>Create Team</h4>
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
            <input type="submit" value="View Team" className="btn" name="viewTeam"/>
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

export default EditTeam;
