from flask.cli import AppGroup
from .users import seed_users, undo_users
from .root_expenses import seed_root_expense, undo_root_expense
from .child_expenses import seed_child_expense, undo_child_expense
from app.models.db import environment
from app.models import db

# `flask seed help`
seed_commands = AppGroup('seed')


# flask seed all
# might want to RUN `flask seed undo` before seeding
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
    else:
        db.drop_all() 
        db.create_all()
    seed_users()
    seed_root_expense()
    seed_child_expense()

# flask seed undo
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_root_expense()
    undo_child_expense()
    
