from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


def seed_payments():

    payment1 = Payment(
        user_id=3,
        expense_id=1,
        method="venmo",
        amount=83.34,
        note="I can cover the rest if need be",
        created_at=db.func.now(),
    )
    payment2 = Payment(
        user_id=2, expense_id=3, method="cash", amount=66.67, created_at=db.func.now()
    )
    payment3 = Payment(
        user_id=3,
        expense_id=3,
        method="paypal",
        amount=66.67,
        created_at=db.func.now(),
    )

    db.session.add(payment1)
    db.session.add(payment2)
    db.session.add(payment3)
    db.session.commit()


def undo_payments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
