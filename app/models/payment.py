from .db import db, environment, SCHEMA, add_prefix_for_prod


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('child_expenses.id')), nullable=False)
    root_expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('root_expenses.id')), nullable=False)
    method = db.Column(db.String(31), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    note = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())

    # user : payments relationship
    payer = db.relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="payment_users"
    )

    recipient = db.relationship(
        "User",
        foreign_keys=[recipient_id],
        back_populates='user_recipients'
    )

    # child_expense : payments relationship
    child_expense_payments = db.relationship(
        "ChildExpense",
        back_populates="payments_child_expenses"
    )
