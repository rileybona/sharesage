from app.models import db, RootExpense, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


def seed_root_expenses():
    # types : entertainment, food, home, travel, other

    food0 = RootExpense(  # Demo (1)
        owner_id=1, name="Dinner", amount="250", expense_type="Food"
    )

    food1 = RootExpense(  # marnie (2)
        owner_id=2, name="Popeye's", amount="120", expense_type="Food"
    )

    food2 = RootExpense(  # marnie (3)
        owner_id=2, name="Starbucks", amount="20", expense_type="Food"
    )

    home0 = RootExpense(  # Demo (4)
        owner_id=1, name="Groceries", amount="80", expense_type="Home"
    )

    home1 = RootExpense(  # marnie (5)
        owner_id=2, name="Coffee pods", amount="20", expense_type="Home"
    )

    home2 = RootExpense(  # Demo (6)
        owner_id=1, name="Paint Supplies", amount="40", expense_type="Home"
    )

    travel0 = RootExpense(  # marnie (7)
        owner_id=2, name="AirBnb", amount="800", expense_type="Travel"
    )

    travel1 = RootExpense(  # bobbie (8)
        owner_id=3, name="Roadtrip Gas", amount="80", expense_type="Travel"
    )

    travel2 = RootExpense(  # Demo (9)
        owner_id=1, name="Plane tickets", amount="560", expense_type="Travel"
    )

    other0 = RootExpense(  # Demo (10)
        owner_id=1, name="Netflix subscription", amount="15", expense_type="Other"
    )

    # expense1 = RootExpense(
    #     owner_id=1,
    #     name="Lunch",
    #     amount=100,
    #     expense_type="Food",
    # )
    # expense2 = RootExpense(
    #     owner_id=2,
    #     name="Dinner",
    #     amount=200,
    #     expense_type="Food",
    # )
    # expense3 = RootExpense(
    #     owner_id=3,
    #     name="Gas",
    #     amount=200,
    #     expense_type="Travel",
    # )
    # expenses = [expense1, expense2, expense3]
    # for exp in expenses:
    #     db.session.add(exp)
    for expense in [
        food0,
        food1,
        food2,
        home0,
        home1,
        home2,
        travel0,
        travel1,
        travel2,
        other0,
    ]:
        db.session.add(expense)
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
