from .db import db, environment, SCHEMA, add_prefix_for_prod

class ChildExpense(db.Model):
    __tablename__ = 'child_expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_expense_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    split_amount = db.Column(db.Float, nullable=False, default=0)
