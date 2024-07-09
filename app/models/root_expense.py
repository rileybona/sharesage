from .db import db, environment, SCHEMA, add_prefix_for_prod


class RootExpense(db.Model):
    __tablename__ = "root_expenses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False, default=0)
    expense_type = db.Column(db.String(20), nullable=False, default="Other")
    transaction_date = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now()
    )
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    # comment : root_expense relationship
    comment_expenses = db.relationship(
        "Comment", back_populates="expense_comments", cascade="all, delete-orphan"
    )

    # child_expense : root_expense relationship
    child_expense_root_expenses = db.relationship(
        "ChildExpense",
        back_populates="root_expense_child_expenses",
        cascade="all, delete-orphan",
    )

    # user : root_expense relationship
    user_root_expenses = db.relationship("User", back_populates="root_expense_users")
