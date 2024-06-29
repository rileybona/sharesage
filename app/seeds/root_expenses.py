from app.models import db, RootExpense, environment, SCHEMA
from sqlalchemy.sql import text 

# Adds a demo user, you can add other users here if you want
def seed_root_expense():
    expense1 = RootExpense(
        owner_id = 1, 
        name = "Lunch", 
        amount = 100, 
        expense_type = "Food", 
    )
    db.session.add(expense1)
    db.session.commit()
    # db.session.add(bobbie)
    # db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_root_expense():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.root_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM root_expenses"))
        
    db.session.commit()
