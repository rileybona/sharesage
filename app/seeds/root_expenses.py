from app.models import db, RootExpense, environment, SCHEMA 
from sqlalchemy.sql import text 
from alembic import op 


def seed_root_expenses(): 

    expense_1 = RootExpense(
        owner_id = 1,
        name = "Lunch",
        amount = 64.22,
        expense_type = "Food",
    )

    db.session.add(expense_1)
    db.session.commit()


def undo_expenses(): 
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.root_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM root_expenses"))
        
    db.session.commit()