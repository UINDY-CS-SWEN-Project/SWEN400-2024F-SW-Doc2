import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Teams.css";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      userTeams: [],
      teamName: '',
      teamMembs: [],
      isChecked: true,
      teamMembsPermission: [],
      userNameToAdd: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name === 'teamName') {
      this.setState({
          teamMembs: [], 
      });
    }
    this.setState({
      [name]: value,
    });
    document.getElementById(name).style.fontFamily = 'Montserrat black';
  };

  handleCheckboxChange = (event) => {
    this.setState({ isChecked: event.target.checked });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (event.nativeEvent.submitter.value === "Create Team") {
      const {teamMembs, teamMembsPermission} = this.state;
      if (teamMembs.length === 0) {
        console.log("Must have at least one member in the team!");
        alert("Must have at least one member in the team!");
        return;
      }
      const userData = {
        teamName: this.state.teamName,
        MembsUserName: teamMembs,
        MembsPermiss: teamMembsPermission,
      };
      fetch('http://localhost:9091/api/createTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Team created successfully!") {
            console.log('Team Creation Success:', data.message);
            alert("Team created successfully");
            this.setState({
              teamMembs: [],
              teamMembsPermission: [],
              teamName: ''
            });
          } else if (data.message === "Team name already exists!") {
            alert('Team name already taken!');
          } else {
            console.log('Team Creation Failed:', data.message);
            alert("Team creation failed!");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if (event.nativeEvent.submitter.value === "Add Team Member") {
      const {userNameToAdd, teamMembs} = this.state; 
      if (teamMembs.includes(userNameToAdd)) {
        console.log("This user is already a team member!");
        alert("This user is already a team member!"); 
        return;
      }
      this.setState((prevState) => ({
        teamMembs: [...prevState.teamMembs, prevState.userNameToAdd],
        teamMembsPermission: [...prevState.teamMembsPermission, prevState.isChecked],
        userNameToAdd: '',
        isChecked: false, 
      }));
    }
  };

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

          <div className="text_area">
            <input
              type="text"
              id="userNameToAdd"
              name="userNameToAdd"
              value={this.state.userNameToAdd}
              onChange={this.handleInputChange}
              placeholder="Enter Team Member Username"
            />
            <label>
              <input
                name="checkbox"
                type="checkbox"
                checked={this.state.isChecked}
                onChange={this.handleCheckboxChange}
              />
              Allow Admin Control?
            </label>
          </div>
          <div>
          </div>
          <input type="submit" name="addMemBtn"value="Add Team Member" className="btn" />
          <input type="submit" name="creTeamBtn"value="Create Team" className="btn" />
        </form>
        {this.state.teamName && this.state.teamMembs.length > 0 && (
          <div className="team-table">
          <table>
            <thead>
              <tr>
                <th colSpan="2">{this.state.teamName}</th>
              </tr>
              <tr>
                <th>Member Username</th>
                <th>Admin Privilege</th>
              </tr>
            </thead>
              <tbody>
                {this.state.teamMembs.map((member, index) => (
                  <tr key={index}>
                    <td>{member}</td>
                    <td>{this.state.teamMembsPermission[index] ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Teams;
