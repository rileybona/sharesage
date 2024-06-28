from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    method = db.Column(db.String(31))
    amount = db.Column(db.Float)
    note = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.now)
