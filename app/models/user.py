from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy import MetaData

metadata_obj = MetaData()

# relationships = Table(
#     "relationships",
#     metadata_obj,
#     Column("user1_id", ForeignKey("users.id"), primary_key=True),
#     Column("user2_id", ForeignKey("users.id"), primary_key=True)
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    # firstname
    first_name = db.Column(db.String(255), nullable=False)
    # lastname
    last_name = db.Column(db.String(255), nullable=False)
    # avatar
    avatar = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())

    # friends (user : user) relationship 
    friends = db.relationship(
        "User", 
        secondary="relationships"
    )


    # comments : users relationship 
    comment_users = db.relationship(
        "Comment",
        back_populates="user_comments"
    )

    # child expense : user relationship 
    child_expense_users = db.relationship(
        "ChildExpense",
        back_populates="user_child_expenses"
    )

    # payment : user relationship 
    payment_users = db.relationship(
        "Payment",
        back_populates="user_payments"
    )

    # user : root_expense relationship
    root_expense_users = db.relationship(
        "RootExpense",
        back_populates="user_root_expenses"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
