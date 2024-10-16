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
    with open('user_data.pkl', 'wb') as f:
        pickle.dump(user_data, f)

    return jsonify({"message": "User data saved successfully!"}), 200


@app.route('/api/authorizeUser', methods=['POST'])
def authorizeUser():
    user_data = request.json
    username = user_data.get('username')
    password = user_data.get('password')
    
    try:
        with open('user_data.pkl', 'rb') as f:
            stored_data = pickle.load(f)
            
        if stored_data['username'] == username and stored_data['password'] == password:
            return jsonify({"successs": True, "message": "Authorization successfull"}), 200
        else:
            return jsonify({"successs": False, "message": "Invalid Username or Password"}), 401
        
    except: 
        return jsonify({"successs":False}), 401

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)

