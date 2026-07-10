# AI Chat Assistant

A full-stack AI chat assistant built with **Flask** (backend) and **React + Vite** (frontend), powered by the **Google Gemini API**. Users can send messages through a simple chat interface and receive AI-generated responses in real time.

---

## Features

- Real-time chat interface with a clean, dark-themed UI
- Flask REST API backend integrated with Google Gemini
- Markdown rendering for AI responses (headers, bold text, lists, code blocks)
- Loading/typing indicator while waiting for a response
- Copy-to-clipboard on AI messages
- Graceful error handling 
- Environment-based configuration using `.env`

---

## Tech Stack

**Backend**
- Python 3.9+
- Flask
- Flask-CORS
- google-genai (Gemini API SDK)
- python-dotenv

**Frontend**
- React
- Vite
- react-markdown
- lucide-react (icons)

---

## Project Structure

```
AI_Chat_Assistant/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env              (not committed — see setup below)
│   └── venv/              (not committed)
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── App.css
    ├── package.json
    └── ...
```

---

## Prerequisites

- Python 3.9 or higher
- Node.js and npm
- A Google Gemini API key 

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd AI_Chat_Assistant
```

### 2. Backend setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```
GEMINI_API_KEY=your_api_key_here
```

Run the backend server:

```bash
python3 app.py
```

The backend will start on **http://127.0.0.1:5000**

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173** (or the next available port).

### 4. Use the app

Open the frontend URL in your browser, type a message, and hit Enter or click Send.

---

## API Reference

### `POST /chat`

Send a user message and receive an AI-generated reply.

**Request body:**
```json
{
  "message": "Hello, how are you?"
}
```

**Success response (200):**
```json
{
  "reply": "I'm doing well, thank you! How can I help you today?"
}
```

**Rate limit response (429):**
```json
{
  "error": "Rate limit reached. Please wait a moment and try again."
}
```

**Error response (500):**
```json
{
  "error": "<error details>"
}
```

---

## Environment Variables

| Variable          | Description                          |
|-------------------|---------------------------------------|
| `GEMINI_API_KEY`  | Your Google Gemini API key            |


---

## Future Improvements

- Persist chat history (localStorage or a database)
- Add streaming responses for a more real-time typing effect
- Support multiple conversation threads
- Deploy backend and frontend to a hosting service

---
