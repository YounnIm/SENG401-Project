import pymysql
from flask import Flask
from .config import Config
from .models import db
from flask_cors import CORS

pymysql.install_as_MySQLdb()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    from .routes import register_routes
    register_routes(app)

    return app