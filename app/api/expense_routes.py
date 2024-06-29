from flask import Blueprint 
from app.models import RootExpense, db

expense_routes = Blueprint("root_expenses", __name__, "/expenses")


# GET AN EXPENSE BY ID 
@expense_routes.route("/<int: id>")
def get_expense_by_id():
    # pull id from url 
    expense_id = id 
    # query db for expense object of said id 
    expense = RootExpense.query.filter(RootExpense.id == id).first()
    # return data object in dictionary format 
    return expense.to_dict()


# UPDATE AN EXPENSE 
@expense_routes.route("/<int: id>", methods=["PUT"])
def update_expense(fe_expense_data): 
    # pull id from url 
    expense_id = id 
    # query that expense object from db 
    expense = RootExpense.query.filter(RootExpense.id == id).first() 
    # pull data from parameters -- how do you destructure in python? lol 
    ( name, amount, expense_type ) = fe_expense_data
    # set expense object attributes equal to new data 
    expense.name = name 
    expense.amount = amount 
    expense.expense_type = expense_type 
    # expense.date = date 
    # expense.equal_split = equal_split 
    db.session.commit() 

    # db.session.commit() 

    pass 

# Riley : 
#   -  Get an Expense by Expense Id 

#   -  Update an Expense 




# (david get all, post, & delete)