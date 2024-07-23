from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChildExpense(db.Model):
    __tablename__ = "child_expenses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    root_expense_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("root_expenses.id")),
        nullable=False,
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    split_amount = db.Column(db.Float, nullable=False, default=0)
    balance = db.Column(db.Float, nullable=False, default=0)

    # root_expense : child_expense relationship
    root_expense_child_expenses = db.relationship(
        "RootExpense", back_populates="child_expense_root_expenses"
    )

    # user : child_expense relationship
    user_child_expenses = db.relationship("User", back_populates="child_expense_users")

    # child_expense : payments relationship
    payments_child_expenses = db.relationship(
        "Payment", back_populates="child_expense_payments", cascade="all, delete-orphan"
    )
