from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


def seed_payments():
    food0_marnie_to_demo = Payment(
        user_id=2,
        expense_id=1,
        root_expense_id=1,
        recipient_id=1,
        method="venmo",
        amount=83.34,
        note="I can cover the rest if need be",
        created_at=db.func.now(),
    )

    food0_bobbie_to_demo = Payment(
        user_id=3,
        expense_id=1,
        root_expense_id=1,
        recipient_id=1,
        method="cash",
        amount=83.34,
        note="paying da bill",
        created_at=db.func.now(),
    )

    # food1_demo_to_marnie1 = Payment(
    #     user_id=1,
    #     expense_id=2,
    #     root_expense_id=2,
    #     recipient_id=2,
    #     method="paypal",
    #     amount=20,
    #     note="covering half",
    #     created_at=db.func.now(),
    # )

    # food1_demo_to_marnie2 = Payment(
    #     user_id=1,
    #     expense_id=2,
    #     root_expense_id=2,
    #     recipient_id=2,
    #     method="cash",
    #     amount=20,
    #     note="covering the rest in cash",
    #     created_at=db.func.now(),
    # )

    food1_bobbie_to_marnie = Payment(
        user_id=3,
        expense_id=2,
        root_expense_id=2,
        recipient_id=2,
        method="venmo",
        amount=40,
        note="I gotchu",
        created_at=db.func.now(),
    )

    food2_demo_to_marnie = Payment(
        user_id=1,
        expense_id=5,
        root_expense_id=3,
        recipient_id=2,
        method="cash",
        amount=10,
        note="for the coffee",
        created_at=db.func.now(),
    )

    home0_bobbie_to_demo = Payment(
        user_id=3,
        expense_id=6,
        root_expense_id=4,
        recipient_id=1,
        method="venmo",
        amount=40,
        note="beer money",
        created_at=db.func.now(),
    )

    home1_demo_to_marnie = Payment(
        user_id=1,
        expense_id=7,
        root_expense_id=5,
        recipient_id=2,
        method="cash",
        amount=10,
        created_at=db.func.now(),
    )

    home2_marnie_to_demo = Payment(
        user_id=2,
        expense_id=8,
        root_expense_id=6,
        recipient_id=1,
        method="paypal",
        amount=20,
        note="for the paint",
        created_at=db.func.now(),
    )

    for payment in [
        food0_marnie_to_demo,
        food0_bobbie_to_demo,
        # food1_demo_to_marnie1,
        # food1_demo_to_marnie2,
        food1_bobbie_to_marnie,
        food2_demo_to_marnie,
        home0_bobbie_to_demo,
        home1_demo_to_marnie,
        home2_marnie_to_demo,
    ]:
        db.session.add(payment)

    db.session.commit()


def undo_payments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
