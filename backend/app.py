# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

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

@app.route('/user', methods=['GET'])
def get_user():
    try:
        user = supabase.auth.get_user()
        serialized_user = serialize_user(user.user)
        return jsonify({"user": serialized_user}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == '__main__':
    app.run(debug=True)