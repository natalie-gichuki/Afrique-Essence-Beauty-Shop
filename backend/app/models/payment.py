from datetime import datetime
from app import db  # adjust import based on your app structure

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receipt = db.Column(db.String(100), unique=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    transaction_date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='Success')  # or 'Failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
