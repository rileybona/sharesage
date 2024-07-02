from app.models import db, RootExpense, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


def seed_root_expenses():

    small_expense = RootExpense(
        owner_id=1, name="Dinner", amount="250", expense_type="Food"
    )

    smaller_expense = RootExpense(
        owner_id=1, name="Groceries", amount="80", expense_type="Groceries"
    )

    big_expense = RootExpense(
        owner_id=2, name="AirBnb", amount="800", expense_type="Travel"
    )

    expense1 = RootExpense(
        owner_id=1,
        name="Lunch",
        amount=100,
        expense_type="Food",
    )
    expense2 = RootExpense(
        owner_id=2,
        name="Dinner",
        amount=200,
        expense_type="Food",
    )
    expense3 = RootExpense(
        owner_id=3,
        name="Gas",
        amount=200,
        expense_type="Travel",
    )
    expenses = [expense1, expense2, expense3]
    for exp in expenses:
        db.session.add(exp)

    db.session.add(small_expense)
    db.session.add(smaller_expense)
    db.session.add(big_expense)
    db.session.commit()


def undo_root_expenses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.root_expenses RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM root_expenses"))

    db.session.commit()


from app.models import db, RootExpense, environment, SCHEMA
from sqlalchemy.sql import text
