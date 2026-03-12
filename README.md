# DrishyaMitraa - AI Photo Management Platform 📸✨

DrishyaMitraa is an advanced, AI-powered photo management application designed to organize, analyze, and categorize your personal photo library intelligently.

Featuring a beautiful, premium glassmorphic UI built with React and Tailwind CSS, and a powerful Python backend that handles image recognition, facial embeddings, and natural language search.

## ✨ Features

- **Premium Dark Theme UI:** Stunning glassmorphism design with silky smooth `framer-motion` animations.
- **Smart Uploads:** Drag-and-drop batch processing for your memories.
- **AI Face Recognition:** Automatically detects and clusters unknown faces, allowing you to label people and instantly find all their photos.
- **Natural Language Search:** Find photos by context, event, or people (e.g., "Sarah in Hawaii").
- **Secure Authentication:** Ready-to-use Supabase-compatible authentication flow (currently mocked for local demonstration).

## 🚀 Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS v3
- Framer Motion
- Lucide React (Icons)
- React Router DOM

### Backend
- Python 3
- Flask
- DeepFace / TensorFlow (Facial Recognition & Embeddings)
- PostgreSQL (via Docker Compose)

## 💻 Running Locally

### 1. Start the Database
Ensure Docker is running, then start the PostgreSQL instance:
```bash
docker-compose up -d
```

### 2. Start the Backend
Navigate to the backend directory, install requirements, and run the Flask server:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 app.py
```
*Note: The backend runs on `http://localhost:5000`.*

### 3. Start the Frontend
Navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
*Note: The frontend runs on `http://localhost:5173`. You will be automatically logged in as a demo user.*

## 🎨 UI/UX Highlights
The entire frontend was recently overhauled to feature:
- A dynamic, animated landing page.
- Secure protected routing (Dashboard, Upload, Gallery, Face Labeling, AI Chat, Settings).
- Real-time skeleton loaders and smooth transition effects.
- Full responsive support from mobile to wide monitors.

---

*DrishyaMitraa - Built for scale, designed for simplicity.*
