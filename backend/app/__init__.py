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
def create_app(config_name):
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
    
    # Create the database tables if they don't exist.
    with app.app_context():
        # Import the routes and models to ensure they are registered with the app context.
        from app import routes, models
       

        # Register blueprints

    return app