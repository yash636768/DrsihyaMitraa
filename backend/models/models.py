from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    event_name = db.Column(db.String(100), nullable=True)
    metadata_json = db.Column(db.Text, nullable=True) # Store EXIF or other data

class Face(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=True) # Null if unknown
    bbox = db.Column(db.String(100), nullable=False) # [x, y, w, h] as string
    embedding_id = db.Column(db.Integer, db.ForeignKey('embedding.id'), nullable=False)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Embedding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vector = db.Column(db.Text, nullable=False) # Store high-dim vector as JSON string
    model_name = db.Column(db.String(50), default='Facenet512')

class DeliveryLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'), nullable=False)
    recipient = db.Column(db.String(255), nullable=False)
    channel = db.Column(db.String(50), nullable=False) # 'email' or 'whatsapp'
    status = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
