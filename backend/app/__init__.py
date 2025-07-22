from flask import Flask

from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
# Imports the config class dictionary (config_by_name) from config.py to load environment-specific configs.
from app.config import config_by_name

# Initialize extensions
# These create instances of Flask extensions without tying them to the app yet.
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

# Defines a function that takes in a configuration name ("development", "testing", etc.).
# This function creates and configures the Flask app based on the provided configuration.
def create_app(config_name = "development"):
    # Creates a new Flask application instance.
    app = Flask(__name__)
    # Loads the configuration settings based on the config_name argument.
    # This line makes .env variables like DATABASE_URL, JWT_SECRET_KEY, etc., available to the app.
    app.config.from_object(config_by_name[config_name])
    
    # Initializes the Flask extensions with the app instance.
    # Initializes the SQLAlchemy database connection with the Flask app.
    db.init_app(app)
    # Initializes the Flask-Migrate extension for database migrations.
    migrate.init_app(app, db)
    # Initializes the Flask-JWT-Extended extension for JWT authentication. Hence on can use JWT in their routes
    jwt.init_app(app)
    # Initializes Flask-CORS to handle Cross-Origin Resource Sharing, allowing the app to accept requests from different origins.
    cors.init_app(app)
    
    from app.routes import auth_routes, user_routes, analytics_routes
    from app import models
       

    # Register blueprints
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
    app.register_blueprint(user_routes.bp, url_prefix='/users')
    app.register_blueprint(analytics_routes.analytics_bp, url_prefix='/analytics')

    return app

