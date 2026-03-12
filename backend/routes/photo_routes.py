from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import uuid
from models.models import db, Photo, Face, Person
from services.face_service import FaceService
from services.chat_service import ChatService

photo_bp = Blueprint('photo', __name__)
face_service = FaceService()
chat_service = ChatService()

@photo_bp.route('/upload', methods=['POST'])
# @jwt_required()
def upload_photo():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = f"{uuid.uuid4()}_{file.filename}"
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(upload_path)

    # Save to DB
    new_photo = Photo(filename=filename, filepath=upload_path)
    db.session.add(new_photo)
    db.session.commit()

    # Process AI
    face_service.process_photo(upload_path, new_photo.id)

    return jsonify({"message": "Photo uploaded and processed", "photo_id": new_photo.id}), 201

@photo_bp.route('/search', methods=['GET'])
def search_photos():
    query = request.args.get('q', '')
    if not query:
        photos = Photo.query.all()
    else:
        # Simple text search for now, could integrate ChatService parse here
        photos = Photo.query.filter(Photo.filename.contains(query) | Photo.event_name.contains(query)).all()
    
    return jsonify([{
        "id": p.id,
        "filename": p.filename,
        "upload_date": p.upload_date.isoformat(),
        "event_name": p.event_name
    } for p in photos])

@photo_bp.route('/label-face', methods=['POST'])
def label_face():
    data = request.json
    face_id = data.get('face_id')
    person_name = data.get('person_name')
    
    if face_service.label_face(face_id, person_name):
        return jsonify({"message": f"Face {face_id} labeled as {person_name}"})
    return jsonify({"error": "Failed to label face"}), 400

@photo_bp.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    parsed = chat_service.parse_query(user_message)
    
    # Execute search based on parsed query
    # (Simplified logic for demonstration)
    results = []
    if 'person' in parsed:
        person = Person.query.filter_by(name=parsed['person']).first()
        if person:
            faces = Face.query.filter_by(person_id=person.id).all()
            photo_ids = [f.photo_id for f in faces]
            photos = Photo.query.filter(Photo.id.in_(photo_ids)).all()
            results = [{"id": p.id, "filename": p.filename} for p in photos]

    return jsonify({"response": f"Found {len(results)} photos.", "results": results, "parsed": parsed})

@photo_bp.route('/photos/<int:photo_id>', methods=['GET'])
def serve_photo(photo_id):
    from flask import send_from_directory
    photo = Photo.query.get_or_404(photo_id)
    return send_from_directory(os.path.dirname(photo.filepath), os.path.basename(photo.filepath))
