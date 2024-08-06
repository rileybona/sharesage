from app.models import db, ChildExpense, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


# Adds a demo user, you can add other users here if you want
def seed_child_expenses():

    dinner_expense1 = ChildExpense(root_expense_id=1, user_id=2, split_amount=83.34, balance=83.34)

    dinner_expense2 = ChildExpense(root_expense_id=1, user_id=3, split_amount=83.34)

    grocery_expense = ChildExpense(root_expense_id=2, user_id=3, split_amount=40, balance=66.67)

    travel_expense1 = ChildExpense(root_expense_id=3, user_id=1, split_amount=266.67)

    travel_expense2 = ChildExpense(root_expense_id=3, user_id=3, split_amount=266.67, balance=66.67)

    db.session.add(dinner_expense1)
    db.session.add(dinner_expense2)
    db.session.add(grocery_expense)
    db.session.add(travel_expense1)
    db.session.add(travel_expense2)
    db.session.commit()


def undo_child_expenses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.child_expenses RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM child_expenses"))

    db.session.commit()
