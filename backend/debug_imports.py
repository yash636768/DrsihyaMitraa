import traceback
try:
    print("Attempting to import tensorflow...")
    import tensorflow as tf
    print(f"TensorFlow version: {tf.__version__}")
    
    print("\nAttempting to import keras...")
    import keras
    print(f"Keras version: {keras.__version__}")
    
    print("\nAttempting to import deepface...")
    from deepface import DeepFace
    print("DeepFace imported successfully")
    
except Exception as e:
    print("\n--- ERROR CAUGHT ---")
    traceback.print_exc()
