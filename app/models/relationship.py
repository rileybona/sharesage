from .db import db, environment, SCHEMA, add_prefix_for_prod

class Relationship(db.Model):
    __tablename__ = "relationships"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"))


# remote_side=[user.id]