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

@app.route('/api/getTeams', methods=['POST'])
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
        
        print("Got here 1")
        print(all_teams)

        for team in all_teams:
            print("For loop")
            for name in team['MembsUserName']:
                print(name)
                print(username)
                if name == username:
                    print("append")
                    curr_teams.append(team)
                    
        with open('team_data.pkl', 'wb') as f:
            pickle.dump(all_teams, f)
                
        print("Got here 2")
        print(curr_teams)

        return jsonify(curr_teams)

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during user in team search."}), 500
    

@app.route('/api/removeUserFromTeam', methods=['POST'])
def removeUserFromTeam():
    user_data = request.json
    membtoRemoveName = user_data.get('membtoRemoveName')
    teamName = user_data.get('teamName')
    all_teams = []
    team_found = False
    try:
        try:
            with open('team_data.pkl', 'rb') as f:
                all_teams = pickle.load(f)
        except FileNotFoundError:
            return jsonify({"message": "No teams are created!"}), 409

        for team in all_teams:
            if team['teamName'] == teamName:
                team_found = True
                if not team.get('MembsUserName', []):
                    return jsonify({"message": "No members in this team!"}), 404
                if membtoRemoveName in team.get('MembsUserName', []):
                    index = team['MembsUserName'].index(membtoRemoveName)
                    team['MembsUserName'].pop(index)
                    team['MembsPermiss'].pop(index)
                    if not team['MembsUserName']:
                        all_teams = [t for t in all_teams if t['teamName'] != teamName]
                    print("Teams", all_teams)
                    with open('team_data.pkl', 'wb') as f:
                        pickle.dump(all_teams, f)
                    return jsonify({"message": f"User successfully removed from team."}), 200
                else:
                    return jsonify({"message": "User not found in team!"}), 404
        if not team_found:
            return jsonify({"message": "Team not found!"}), 404
    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during team member removal."}), 500

@app.route('/api/saveText', methods=['POST'])
def saveText():
    save_data = request.json
    
    print("Incoming save:", save_data)
    print("Type of save:", type(save_data))
    
    try:
        try:
            with open('saveText.pkl', 'rb') as f:
                textToSave = pickle.load(f)
        except FileNotFoundError:
            textToSave = []
        
        textToSave.append(save_data)
        
        with open('saveText.pkl', 'wb') as f:
            pickle.dump(textToSave, f)

        return jsonify({"message": "Document saved successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during Document saving."}), 500
    
@app.route('/api/saveTemplate', methods=['POST'])
def saveTemplate():
    save_data = request.json
    
    print("Incoming save:", save_data)
    print("Type of save:", type(save_data))
    
    try:
        try:
            with open('saveTemplate.pkl', 'rb') as f:
                templateToSave = pickle.load(f)
        except FileNotFoundError:
            templateToSave = []
        
        templateToSave.append(save_data)
        
        with open('saveTemplate.pkl', 'wb') as f:
            pickle.dump(templateToSave, f)

        return jsonify({"message": "Template saved successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during template saving."}), 500
    
    
@app.route('/api/getSavedDocuments', methods=['POST'])
def getSavedDocuments():
    user_data = request.json
    username = user_data.get('username')
    curr_docs = []
    all_docs = []
    try:
        try:
            with open('saveText.pkl', 'rb') as f:
                all_docs = pickle.load(f)
        except FileNotFoundError:
            return jsonify({"message": "No documents are created!"}), 409

        for doc in all_docs:
            if doc['username'] == username:
                curr_docs.append({'title': doc.get('documentTitle'), 'content': doc.get('content')})

        return jsonify(curr_docs)

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during document search."}), 500

@app.route('/api/getSavedTemplates', methods=['POST'])
def getSavedTemplates():
    user_data = request.json
    username = user_data.get('username')
    curr_templs = []
    all_templs = []
    
    try:
        try:
            with open('saveTemplate.pkl', 'rb') as f:
                all_templs = pickle.load(f)
        except FileNotFoundError:
            return jsonify({"message": "No templates are created!"}), 409

        for doc in all_templs:
            if doc['username'] == username:
                curr_templs.append({'title': doc.get('templateTitle'), 'content': doc.get('content')})

        return jsonify(curr_templs)

    except Exception as e:
        return jsonify({"error": str(e), "message": "An error occurred during template search."}), 500
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)

