from flask import Blueprint, request
from .utils import CommentUtils, AuthUtils
from app.models import db, Comment, User
from flask_login import login_required

comment = Blueprint("comments", __name__)

@comment.route("/expenses/<int:expense_id>/comments", methods=["GET"])
@login_required
def get_comments(expense_id):
    return CommentUtils.get_all_comments(expense_id)
