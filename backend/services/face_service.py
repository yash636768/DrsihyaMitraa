import os
import cv2
import json
import numpy as np
from deepface import DeepFace
from models.models import Photo, Face, Person, Embedding, db

class FaceService:
    def __init__(self, model_name='Facenet512', detector_backend='retinaface'):
        self.model_name = model_name
        self.detector_backend = detector_backend

    def process_photo(self, photo_path, photo_id):
        """
        Detect faces, generate embeddings, and match with existing persons.
        """
        try:
            # Detect faces and generate embeddings
            results = DeepFace.represent(
                img_path=photo_path,
                model_name=self.model_name,
                detector_backend=self.detector_backend,
                enforce_detection=False
            )

            for result in results:
                bbox = result['facial_area'] # x, y, w, h
                embedding_vector = result['embedding']

                # Create Embedding record
                new_embedding = Embedding(
                    vector=json.dumps(embedding_vector),
                    model_name=self.model_name
                )
                db.session.add(new_embedding)
                db.session.flush()

                # Search for matching person (simple cosine similarity for now)
                person_id = self.find_match(embedding_vector)

                # Create Face record
                new_face = Face(
                    photo_id=photo_id,
                    person_id=person_id,
                    bbox=json.dumps(bbox),
                    embedding_id=new_embedding.id
                )
                db.session.add(new_face)

            db.session.commit()
            return True
        except Exception as e:
            print(f"Error processing photo: {e}")
            db.session.rollback()
            return False

    def find_match(self, new_vector, threshold=0.4):
        """
        Find a matching person using cosine similarity.
        """
        all_embeddings = Embedding.query.all()
        for emb in all_embeddings:
            stored_vector = np.array(json.loads(emb.vector))
            similarity = self.cosine_similarity(new_vector, stored_vector)
            
            if similarity > (1 - threshold): # Using 1-threshold for similarity comparison
                # Find face and then person
                face = Face.query.filter_by(embedding_id=emb.id).first()
                if face and face.person_id:
                    return face.person_id
        
        return None

    @staticmethod
    def cosine_similarity(v1, v2):
        v1 = np.array(v1)
        v2 = np.array(v2)
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    def label_face(self, face_id, person_name):
        """
        Assign a person name to a detected face.
        """
        person = Person.query.filter_by(name=person_name).first()
        if not person:
            person = Person(name=person_name)
            db.session.add(person)
            db.session.flush()

        face = Face.query.get(face_id)
        if face:
            face.person_id = person.id
            db.session.commit()
            return True
        return False
