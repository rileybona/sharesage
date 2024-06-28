from .db import db, environment, SCHEMA

class RootExpense(db.Model):
    __tablename__ = "root_expenses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False, default=0)
    expense_type = db.Column(db.String(20), nullable=False, default="Other")
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())

    # comment : root_expense relationship
    comment_expenses = db.relationship(
        "Comment",
        back_populates="expense_comments"
    )

    # child_expense : root_expense relationship
    child_expense_root_expenses = db.relationship(
        "ChildExpense",
        back_populates="root_expense_child_expenses"
    )

    # user : root_expense relationship
    user_root_expenses = db.relationship(
        "User",
        back_populates="root_expense_users"
    )
