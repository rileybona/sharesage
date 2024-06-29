from flask import Blueprint
from .utils import ExpenseUtils, AuthUtils
from flask_login import login_required

root = Blueprint("root_expenses", __name__)

@root.route("/", methods = ["GET"])
@login_required
def get_all_expenses():
    return ExpenseUtils.get_all_expenses()

