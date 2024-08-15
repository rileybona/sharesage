from app.models import db, ChildExpense, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


# Adds a demo user, you can add other users here if you want
def seed_child_expenses():
    # naming: rootExpenseName_Payee
    food0_marnie = ChildExpense(  # 1: from marnie to demo about food0 (root expense variable name; see root_expense.py seeder)
        root_expense_id=1, user_id=2, split_amount=83.34, balance=83.34
    )

    food0_bobbie = ChildExpense(  # 2: from bobbie to demo about food0
        root_expense_id=1, user_id=3, split_amount=83.34, balance=83.34
    )

    food1_demo = ChildExpense(  # 3: from demo to marnie about food1
        root_expense_id=2, user_id=1, split_amount=40
    )

    food1_bobbie = ChildExpense(  # 4: from bobbie to marnie about food1
        root_expense_id=2, user_id=3, split_amount=40, balance=40
    )

    food2_demo = ChildExpense(  # 5: from demo to marnie about food2
        root_expense_id=3, user_id=1, split_amount=10, balance=10
    )

    home0_bobbie = ChildExpense(  # 6: from bobbie to demo about home0
        root_expense_id=4, user_id=3, split_amount=40, balance=40
    )

    home1_demo = ChildExpense(  # 7: from demo to marnie about home1
        root_expense_id=5, user_id=1, split_amount=10, balance=10
    )

    home2_marnie = ChildExpense(  # 8: from marnie to demo about home2
        root_expense_id=6, user_id=2, split_amount=20, balance=20
    )

    travel0_demo = ChildExpense(  # 9: from demo to marnie about travel0
        root_expense_id=7, user_id=1, split_amount=266.67
    )

    travel0_bobbie = ChildExpense(  # 10: from bobbie to marnie about travel0
        root_expense_id=7, user_id=3, split_amount=266.67
    )

    travel1_demo = ChildExpense(  # 11: from demo to bobbie about travel1
        root_expense_id=8, user_id=1, split_amount=20
    )

    travel1_marnie = ChildExpense(  # 12: from marnie to bobbie about travel1
        root_expense_id=8, user_id=2, split_amount=20
    )

    travel1_user4 = ChildExpense(  # 13: from user4 to bobbie about travel1
        root_expense_id=8, user_id=4, split_amount=20
    )

    travel2_bobbie = ChildExpense(  # 14: from bobbie to demo about travel2
        root_expense_id=9, user_id=3, split_amount=280
    )

    other0_marnie = ChildExpense(  # 15: from marnie to demo about other0
        root_expense_id=10, user_id=2, split_amount=7.5
    )
    for expense in [
        food0_marnie,
        food0_bobbie,
        food1_demo,
        food1_bobbie,
        food2_demo,
        home0_bobbie,
        home1_demo,
        home2_marnie,
        travel0_demo,
        travel0_bobbie,
        travel1_demo,
        travel1_marnie,
        travel1_user4,
        travel2_bobbie,
        other0_marnie,
    ]:
        db.session.add(expense)
    db.session.commit()


def undo_child_expenses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.child_expenses RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM child_expenses"))

    db.session.commit()
