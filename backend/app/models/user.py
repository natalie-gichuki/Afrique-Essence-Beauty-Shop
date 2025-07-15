from app import db
from sqlalchemy.orm import validates
import re

# This module defines the User model for the application.
# Create the users table with fields for id, username, email, password, and role.
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='customer')
    
    # Validate password, and email fields
    @validates('password_hash')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain atleast one uppercase letter.")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain atleast one lowercase letter.")
        if not re.search(r"[0-9]", password):
            raise ValueError("Password must contain atleast one digit.")
        if not re.search(r"[!#$&*]", password):
            raise ValueError("Password must contain atleast one of these special character.[!#$&*]")
        return password
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", email):
            raise ValueError("Invalid email format.")
        return email

    def __repr__(self):
        return f'<User {self.username}>'