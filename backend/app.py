from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://your-frontend.vercel.app" 
])

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        user_message = data.get("message", "")

        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=user_message
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        error_str = str(e)
        if "RESOURCE_EXHAUSTED" in error_str or "429" in error_str:
            return jsonify({
                "error": "Rate limit reached. Please wait a moment and try again."
            }), 429
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=False)