from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# from sqlalchemy import MetaData
#
# metadata_obj = MetaData()
#
# relationships = db.Table(
#     "relationships",
#     db.metadata,
#     db.Column("user1_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
#     db.Column("user2_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
# ) orioiwejfoi


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable = False, server_default=db.func.now())

    # friends (user : user) relationship
    # friender = db.relationship(
    #     "User",
    #     secondary=relationships,
    #     primaryjoin=(relationships.c.user1_id == id),
    #     secondaryjoin=(relationships.c.user2_id == id),
    #     back_populates="friendee"
    # )
    #
    # friendee = db.relationship(
    #     "User",
    #     secondary="relationships",
    #     primaryjoin=(relationships.c.user2_id == id),
    #     secondaryjoin=(relationships.c.user1_id == id),
    #     back_populates="friender"
    # )
    #

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
        foreign_keys="[Payment.user_id]",
        back_populates="payer"
    )

    user_recipients = db.relationship(
        "Payment",
        foreign_keys="[Payment.recipient_id]",
        back_populates='recipient'
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
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'avatar': self.avatar
        }
