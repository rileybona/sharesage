from flask import Blueprint, request
from .utils import CommentUtils
from flask_login import login_required

comment = Blueprint("comments", __name__)

@comment.route("/expenses/<int:expense_id>/comments", methods=["GET"])
@login_required
def get_comments(expense_id):
    return CommentUtils.get_all_comments(expense_id)

@comment.route("/expenses/<int:expense_id>/comments", methods=["POST"])
@login_required
def post_new_comment(expense_id):
    req_body = request.get_json()
    return CommentUtils.create_new_comment(req_body, expense_id)

@comment.route("/comments/<int:comment_id>", methods=["PUT"])
@login_required
def update_comment(comment_id):
    req_body = request.get_json()
    return CommentUtils.update_comment_by_id(req_body, comment_id)

@comment.route("/comments/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    return CommentUtils.delete_comment_by_id(comment_id)
