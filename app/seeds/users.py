from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from alembic import op


# Adds a demo user, you can add other users here if you want
def seed_users():
    # db.drop_all()
    # db.create_all()

    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="Demo",
        last_name="Drake",
        avatar="/img/yahoo.jpeg",
    )
    marnie = User(
        username="marnie",
        email="marnie@aa.io",
        password="password",
        first_name="Marnie",
        last_name="Blake",
        avatar="/img/cow.jpeg",
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@aa.io",
        password="password",
        first_name="Bobbie",
        last_name="Klein",
        avatar="/img/man.jpeg",
    )
    jessica = User(
        username="jessica",
        email="jessica@aa.io",
        password="password",
        first_name="Jessica",
        last_name="Jones",
        avatar="/img/woman.jpeg",
    )

    charlie = User(
        username="charlie",
        email="charlie@aa.io",
        password="password",
        first_name="Charlie",
        last_name="Brown",
        avatar="/img/dog.jpeg",
    )

    alex = User(
        username="alex",
        email="alex@aa.io",
        password="password",
        first_name="Alex",
        last_name="Smith",
        avatar="/img/cat.jpeg",
    )

    taylor = User(
        username="taylor",
        email="taylor@aa.io",
        password="password",
        first_name="Taylor",
        last_name="Swift",
        avatar="/img/guitar.jpeg",
    )

    emily = User(
        username="emily",
        email="emily@aa.io",
        password="password",
        first_name="Emily",
        last_name="Davis",
        avatar="/img/book.jpeg",
    )

    daniel = User(
        username="daniel",
        email="daniel@aa.io",
        password="password",
        first_name="Daniel",
        last_name="Kim",
        avatar="/img/phone.jpeg",
    )

    olivia = User(
        username="olivia",
        email="olivia@aa.io",
        password="password",
        first_name="Olivia",
        last_name="Rodriguez",
        avatar="/img/sun.jpeg",
    )
    for user in [
        demo,
        marnie,
        bobbie,
        jessica,
        charlie,
        alex,
        taylor,
        emily,
        daniel,
        olivia,
    ]:
        db.session.add(user)
        db.session.commit()
    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
