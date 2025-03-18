import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    COHERE_API_KEY = os.getenv('COHERE_API_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY')
