from cryptography.fernet import Fernet
import os

class SecurityService:
    @staticmethod
    def generate_key():
        return Fernet.generate_key().decode()

    @staticmethod
    def encrypt_embedding(embedding_list, key):
        f = Fernet(key.encode())
        embedding_str = str(embedding_list)
        return f.encrypt(embedding_str.encode()).decode()

    @staticmethod
    def decrypt_embedding(encrypted_str, key):
        f = Fernet(key.encode())
        decrypted_str = f.decrypt(encrypted_str.encode()).decode()
        return eval(decrypted_str)
