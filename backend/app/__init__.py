import pymysql
from flask import Flask
from .config import Config
from .models import db
from flask_cors import CORS

pymysql.install_as_MySQLdb()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SECRET_KEY'] = 'your-secret-key'  # Required for sessions

    # Configure CORS
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    db.init_app(app)

    from .routes import register_routes
    register_routes(app)

    return app