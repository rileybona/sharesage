from app.models import db, ChildExpense, environment, SCHEMA
from sqlalchemy.sql import text 

# Adds a demo user, you can add other users here if you want
def seed_child_expense():
    expense1 = ChildExpense(
        root_expense_id = 1, 
        user_id = 2, 
        split_amount = 50, 
    )
    expense2 = ChildExpense(
        root_expense_id = 1, 
        user_id = 3, 
        split_amount = 50, 
    )
    expenses = [expense1, expense2]
    for exp in expenses: 
        db.session.add(exp)
    db.session.commit()
    # db.session.add(bobbie)
    # db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_child_expense():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.child_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM child_expenses"))
        
    db.session.commit()

