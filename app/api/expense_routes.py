from flask import Blueprint, request, jsonify
from .utils import ExpenseUtils, AuthUtils, ChildExpenseUtils
from flask_login import login_required

expense = Blueprint("root_expenses", __name__)


# Root Expense routes
@expense.route("/", methods=["GET"])
@login_required
def get_all_expenses():
    return jsonify({"expenses": ExpenseUtils.get_all_expenses()})


@expense.route("/", methods=["POST"])
@login_required
def post_new_expense():
    req_body = request.get_json()
    new_expense = ExpenseUtils.create_new_expense(req_body)
    if new_expense == 500:
        return jsonify({"message": "Expense creation failed"}), 500
    return jsonify(new_expense), 201


@expense.route("/<int:id>", methods=["GET"])
@login_required
def get_expense(id):
    expense = ExpenseUtils.get_expense_details_by_id(int(id))
    if expense == 401:
        return jsonify({"message": "Not Authorized"}), 401
    return jsonify(expense), 200


@expense.route("/<int:id>", methods=["PUT"])
@login_required
def update_expense(id):
    req_body = request.get_json()
    updated_expense = ExpenseUtils.update_expense_by_id(id, req_body)
    if updated_expense == 403:
        return jsonify({"message": "Not Authorized"}), 403
    if updated_expense == 500:
        return jsonify({"message": "Expense update failed"}), 500
    return jsonify(updated_expense), 200


@expense.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_expense(id):
    status = ExpenseUtils.delete_expense_by_id(int(id))
    if status == 0:
        return jsonify({"message": "Deletion Successful"}), 200
    else:
        return jsonify({"message": "Internal Server Error"}), 500


# Child Expense routes
@expense.route("/<int:id>/payees", methods=["GET"])
@login_required
def get_payees_by_expense(id):
    """Returns child expenses and their owners"""
    (child_expenses, users) = ChildExpenseUtils.get_payees_by_expense_id(int(id))

    return jsonify({"child_expenses": child_expenses, "payees": users}), 200


@expense.route("/<int:id>/payees", methods=["POST", "PUT"])
def add_payee_expense(id):
    payload = request.get_json()
    # return {"test": ChildExpenseUtils.add_payee_to_expense(id, payload)}
    (child_expenses, users) = ChildExpenseUtils.add_payee_to_expense(id, payload)
    return jsonify({"child_expenses": child_expenses, "payees": users}), 201
