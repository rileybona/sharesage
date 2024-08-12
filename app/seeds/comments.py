from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


def seed_comments():

    comment1 = Comment(
        text="Wow, maybe I shouldn't have ordered the steak haha",
        expense_id=1,
        user_id=2,
        created_at=db.func.now(),
        updated_at=db.func.now(),
    )
    comment2 = Comment(
        text="Yeah, don't worry about it, pay it whenever you can",
        expense_id=1,
        user_id=1,
        created_at=db.func.now(),
        updated_at=db.func.now(),
    )
    comment3 = Comment(
        text="Updated the spreadsheet to reflect the bill",
        expense_id=7,
        user_id=3,
        created_at=db.func.now(),
        updated_at=db.func.now(),
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
