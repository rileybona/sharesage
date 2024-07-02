from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime 

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    # expense_id
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('root_expenses.id')), nullable=False)
    # user_id
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())


    user_comments = db.relationship(
        "User",
        back_populates="comment_users"
    )

    expense_comments = db.relationship(
        "RootExpense",
        back_populates="comment_expenses"
    )