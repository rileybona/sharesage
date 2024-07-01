from flask import Blueprint, request
from .utils import ExpenseUtils
from flask_login import login_required

root = Blueprint("root_expenses", __name__)

@root.route("/", methods = ["GET"])
@login_required
def get_all_expenses():
    return ExpenseUtils.get_all_expenses()

@root.route("/", methods = ["POST"])
def post_new_expense(): 
    req_body = request.get_json()
    return ExpenseUtils.create_new_expense(req_body)

@root.route("/<int: id>", methods = ["PUT"])
def update_expense():
    req_body = request.get_json()
    return ExpenseUtils.update_expense_by_id(id, req_body)
   
@root.route("/<int:id>", methods = ["DELETE"])
def delete_expense(id):
    return ExpenseUtils.delete_expense_by_id(int(id))

