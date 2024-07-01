from flask import Blueprint, request, jsonify
from .utils import ExpenseUtils, AuthUtils, ChildExpenseUtils
from flask_login import login_required

expense = Blueprint("root_expenses", __name__)

# Root Expense routes
@expense.route("/", methods = ["GET"])
@login_required
def get_all_expenses():
    return ExpenseUtils.get_all_expenses()

@expense.route("/", methods = ["POST"])
def post_new_expense():
    req_body = request.get_json()
    return ExpenseUtils.create_new_expense(req_body)

@expense.route("/<int:id>", methods = ["GET"])
def get_expense(id):
    expense = ExpenseUtils.get_expense_by_id(int(id))
    if expense.owner_id == AuthUtils.get_current_user()['id']:
        return ExpenseUtils.parse_data(expense)
    else:
        return {"message": "Not Authorized"}


@expense.route("/<int:id>", methods = ["PUT"])
def update_expense(id):
    req_body = request.get_json()
    return ExpenseUtils.update_expense_by_id(id, req_body)

@expense.route("/<int:id>", methods = ["DELETE"])
def delete_expense(id):
    return ExpenseUtils.delete_expense_by_id(int(id))

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