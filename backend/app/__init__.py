from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes.analytics_routes import analytics_bp
    from .routes.export_routes import export_bp

    app.register_blueprint(analytics_bp)
    app.register_blueprint(export_bp)

    return app
