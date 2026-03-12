import os
import json
from groq import Groq
from config.config import Config

class ChatService:
    def __init__(self):
        self.client = Groq(api_key=Config.GROQ_API_KEY) if Config.GROQ_API_KEY else None

    def parse_query(self, user_query):
        """
        Parses a natural language query into a structured search format.
        Example: "Show photos of Priya from last month" -> {"person": "Priya", "time_range": "last_month"}
        """
        if not self.client:
            return {"error": "Groq API key not configured"}

        prompt = f"""
        You are an assistant for an AI photo management system. 
        Convert the following user query into a structured JSON format for searching a photo database.
        Strictly return ONLY the JSON object.
        
        Database fields:
        - person: Name of the person (string)
        - event: Name of the event (string)
        - date_range: One of ["last_week", "last_month", "last_year", "custom"]
        - start_date: ISO date (string, optional)
        - end_date: ISO date (string, optional)
        - action: One of ["search", "send_whatsapp", "send_email"]
        - recipient: Phone number or email (string, optional)

        User Query: "{user_query}"
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192",
                response_format={"type": "json_object"}
            )
            return json.loads(chat_completion.choices[0].message.content)
        except Exception as e:
            print(f"Error parsing query: {e}")
            # Fallback simple parser or error
            return {"error": str(e), "original_query": user_query}
