import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret-key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///drishyamitra.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Storage Configuration
    STORAGE_PATH = os.getenv('STORAGE_PATH', 'storage')
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    
    # API Keys
    GROQ_API_KEY = os.getenv('GROQ_API_KEY')
    GMAIL_USER = os.getenv('GMAIL_USER')
    GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD')
    WHATSAPP_API_KEY = os.getenv('WHATSAPP_API_KEY')
