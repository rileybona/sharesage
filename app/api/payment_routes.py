from flask import Blueprint, request
from .utils import PaymentUtils
from flask_login import login_required

payment = Blueprint("payments", __name__)


@payment.route("/expenses/<int:expense_id>/payments", methods=["GET"])
@login_required
def get_payments(expense_id):
    return PaymentUtils.get_all_payments(expense_id)


@payment.route("/expenses/<int:expense_id>/payments", methods=["POST"])
@login_required
def post_new_payment(expense_id):
    req_body = request.get_json()
    return PaymentUtils.create_new_payment(req_body, expense_id)


@payment.route("/payments/current", methods=["GET"])
@login_required
def get_user_payments():
    return PaymentUtils.get_payments_by_user()
