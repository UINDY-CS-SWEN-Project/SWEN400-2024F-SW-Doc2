#!/usr/bin/env python
import os
from os.path import join, dirname
from flask import Flask, render_template, redirect, url_for, request, jsonify
#best use mysql-connector-python for mysql 8.0
import mysql.connector 
import pickle
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})


@app.route('/')
def hello():
    return "Flask - Hello World!!"

@app.route('/ex', methods=['POST', 'GET'])
def ex():
    user = ""
    if request.method == 'POST':
        if 'nm' in request.form:
            user = request.form('nm')
        return "Flask parameter: " + user
    else:
        if 'nm' in request.args:
            user = request.args.get('nm')
        return "Flask parameter: " + user
    
@app.route('/db', methods=['POST', 'GET'])
def db():
    cnx = mysql.connector.connect(user='root', password='root123!',
                              host='db',
                              database='my_test_db')
    db_str = ""
    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            result = cursor.execute("SELECT * from test_data")
            rows = cursor.fetchall()
            for rows in rows:
                print(rows)
                db_str = db_str + " NAME: " + rows[0] + "TITLE: " + rows[1]
        cnx.close()
    else:
        return "Cannot connect"
    return "Good MySQL connections!!! " + db_str


@app.route('/api/register', methods=['POST'])
def register():
    user_data = request.json
    
    print("Incoming user_data:", user_data)
    print("Type of user_data:", type(user_data))
    
    try:
        try:
            with open('user_data.pkl', 'rb') as f:
                all_users = pickle.load(f)
        except FileNotFoundError:
            all_users = []

        if any(user['username'] == user_data['username'] for user in all_users):
            return jsonify({"message": "Username already exists!"}), 409
        
        all_users.append(user_data)
        
        with open('user_data.pkl', 'wb') as f:
            pickle.dump(all_users, f)

        return jsonify({"message": "User registered successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during registration."}), 500




@app.route('/api/authorizeUser', methods=['POST'])
def authorizeUser():
    user_data = request.json
    username = user_data.get('username')
    password = user_data.get('password')
    
    try:
        with open('user_data.pkl', 'rb') as f:
            all_users = pickle.load(f)

        for user in all_users:
            if user['username'] == username and user['password'] == password:
                return jsonify({"success": True, "message": "Authorization successful"}), 200

        return jsonify({"success": False, "message": "Invalid Username or Password"}), 401

    except FileNotFoundError:
        return jsonify({"success": False, "message": "No registered users found"}), 404

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during authorization."}), 500


@app.route('/api/createTeam', methods=['POST'])
def createTeam():
    team_data = request.json
    
    try:
        try:
            with open('team_data.pkl', 'rb') as f:
                all_teams = pickle.load(f)
        except FileNotFoundError:
            all_teams = []

        if any(team["teamName"] == team_data["teamName"] for team in all_teams):
            return jsonify({"message": "Team name already exists!"}), 409
        
        all_teams.append(team_data)
        print(all_teams)
        with open('team_data.pkl', 'wb') as f:
            pickle.dump(all_teams, f)

        return jsonify({"message": "Team created successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during team creation."}), 500

@app.route('/api/getTeams', methods=['GET'])
def getTeams():
    user_data = request.json
    username = user_data.get('username')
    curr_teams = []
    
    try:
        try:
            with open('team_data.pkl', 'rb') as f:
                all_teams = pickle.load(f)
        except FileNotFoundError:
            return jsonify({"message": "No teams are created!"}), 409

        for team in all_teams:
            if team['username'] == username:
                curr_teams.append(team)

        return jsonify(curr_teams)

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during user in team search."}), 500

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)

