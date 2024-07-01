<<<<<<< Updated upstream
from flask import Blueprint 
from app.models import RootExpense, db
=======
from flask import Blueprint, request, jsonify
from .utils import ExpenseUtils, AuthUtils, ChildExpenseUtils
from flask_login import login_required
>>>>>>> Stashed changes

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


<<<<<<< Updated upstream
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
=======
#Child Expense routes
@expense.route("/<int:id>/payees", methods = ["GET"])
def get_payees_by_expense(id):
    """ Returns child expenses and their owners:
        [{
            "id": 1,
            "owner": {
                "avatar": "/img/cow.jpeg",
                "email": "marnie@aa.io",
                "first_name": "Marnie",
                "id": 2,
                "last_name": "Blake",
                "username": "marnie"
            },
            "root_expense_id": 1,
            "split_amount": 50.0,
            "user_id": 2
        },
        ...]
    """
    return ChildExpenseUtils.get_payees_by_expense_id(int(id))


@expense.route("/<int:id>/payees", methods=["POST", "PUT"])
def add_payee_expense(payload): 
    return jsonify(ChildExpenseUtils.add_payee_to_expense(id, payload)), 201
>>>>>>> Stashed changes
