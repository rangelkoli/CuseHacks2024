# app.py
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import google.generativeai as genai
import os
import pandas as pd
from flask import send_file
import numpy as np
import re
import random
import datetime
genai.configure(api_key="AIzaSyAwvCQ2nREhgWtPDDMZC7Qi4srTX8i2WtM")

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)


def serialize_user(user):
    return {
        "id": user.id,
        "email": user.email,
        "phone": user.phone,
        "created_at": str(user.created_at),
        "updated_at": str(user.updated_at),
        "last_sign_in_at": str(user.last_sign_in_at),
        "user_metadata": user.user_metadata,
        "app_metadata": user.app_metadata,
    }

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        if response.user:
            serialized_user = serialize_user(response.user)

            return jsonify({"message": "User created successfully", "user": serialized_user}), 201
        else:
            return jsonify({"message": "User creation pending", "user": None}), 202
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        serialized_user = serialize_user(response.user)
        return jsonify({
            "message": "Login successful",
            "user": serialized_user,
            "session": {
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token,
                "expires_at": str(response.session.expires_at),
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route('/logout', methods=['POST'])
def logout():
    try:
        supabase.auth.sign_out()
        return jsonify({"message": "Logout successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/user', methods=['POST'])
def get_user():
    while True:
        random_id = random.randint(100000, 999999)
        data = supabase.table('user_profiles').select().eq('random_id', random_id).execute()
        print(data)
        if data.count == None:
            break
    # Rest of the code
    data = supabase.table('user_profiles').select().eq('random_id', random_id).execute()
    if data==[]:
        locationData = supabase.table('user_locations').select().eq('id', random_id).execute()
        print(locationData)
    else:
        user = supabase.table('user_profiles').insert({
            'name': "John Doe",
        }).execute()
        print(user)
        location = supabase.table('user_locations').insert({
            'user_id': user.data[0]['id'],
            'coordinates': {
                'lat': 0.0,
                'lng': 0.0
            },
            'last_updated': "2021-09-10T12:00:00"
        }).execute()
        print(user)
    print(data)
    return jsonify({"message": "User created successfully", "user_id": user.data[0]['id']}), 201



@app.route('/upload-photo', methods=['POST'])
def upload_photo():
    try:
        file = request.files['photo']
        # Save the file to a desired location
        file.save('/path/to/save/photo.jpg')
        return jsonify({"message": "Photo uploaded successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

       


@app.route('/blue-light-markers', methods=['GET'])
def blue_light_markers():
    new_dataframe = pd.read_csv('./new_markers.csv')
    print(new_dataframe.head())
    json_data = []
    index = 0
    for row in new_dataframe.iterrows():
        lat, lng = re.sub(r"\s", "", str(row[1]["Lat"])), re.sub(r"\s", "", str(row[1]["Lng"]))
        json_data.append({
            "id": index,
            "Location": row[1]["Location"],
            "Lat": lat,
            "Lng":lng
        })
        index += 1
    print(json_data)
    try:
        return json_data, 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400


@app.route('/user_location_update', methods=['POST'])
def user_location():
    data = request.json
    user_id = data.get('user_id')
    lat = data.get('latitude')
    lng = data.get('longitude')
    user_data = supabase.table('user_locations').update({
        'coordinates': {
            'lat': lat,
            'lng': lng
        },
        'last_updated': datetime.datetime.now().isoformat()
    }).eq('user_id', user_id).execute()

    return jsonify({"message": "User location updated successfully",}), 200

@app.route('/dps-location', methods=['GET'])
def dps_location():
    dps_locations = [
        {"lat": 40.7128, "lng": -74.0060},
        {"lat": 34.0522, "lng": -118.2437},
        {"lat": 51.5074, "lng": -0.1278},
        # Add more locations as needed
    ]
    
    # Update new location to one of the locations from the array
    new_location = random.choice(dps_locations)
    
    return jsonify(new_location), 200
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5050")





