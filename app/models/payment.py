from .db import db, environment, SCHEMA, add_prefix_for_prod


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey('child_expenses.id'), nullable=False)
    method = db.Column(db.String(31))
    amount = db.Column(db.Float)
    note = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())

    # user : payments relationship
    user_payments = db.relationship(
        "User",
        back_populates="payment_users"
    )

    # child_expense : payments relationship 
    child_expense_payments = db.relationship(
        "ChildExpense",
        back_populates="payments_child_expenses"
    )

