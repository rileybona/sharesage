from flask.cli import AppGroup
from .users import seed_users, undo_users
from .root_expenses import seed_root_expenses, undo_root_expenses
from .child_expenses import seed_child_expenses, undo_child_expenses
from .comments import seed_comments, undo_comments
from .payments import seed_payments, undo_payments
from app.models.db import environment, SCHEMA
from app.models import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_payments()
        undo_comments()
        undo_child_expenses()
        undo_root_expenses()
        undo_users()
    else:
        db.drop_all()
        db.create_all()
    seed_users()
    # Add other seed functions here
    seed_root_expenses()
    seed_child_expenses()
    seed_comments()
    seed_payments()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_payments()
    undo_comments()
    undo_child_expenses()
    undo_root_expenses()
    undo_users()
    
    
    

