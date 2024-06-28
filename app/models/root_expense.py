from .db import db

class RootExpense(db.Model):
    __tablename__ = "root_expenses"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False, default=0)
    expense_type = db.Column(db.String(20), nullable=False, default="Other")
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
