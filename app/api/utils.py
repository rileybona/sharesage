from os import name
from app.models import db, RootExpense, ChildExpense, User, Comment
from flask_login import current_user
from flask import Response, jsonify

# ROOT EXPENSES
class ExpenseUtils:
    @staticmethod
    def parse_data(expense_obj): # TO-DO add new attributes
        try:
            return ({
                "id": expense_obj.id,
                "owner_id": expense_obj.owner_id,
                "name" : expense_obj.name,
                "amount" : expense_obj.amount,
                "expense_type" : expense_obj.expense_type,
                "created_at" : expense_obj.created_at,
                "updated_at" : expense_obj.updated_at
            })
        except:
            raise Exception("Invalid Expense Object from query")

    @staticmethod
    def get_all_expenses():
        ownerId = AuthUtils.get_current_user()['id']
        all_expenses = RootExpense.query.filter(RootExpense.owner_id == int(ownerId)).all()

        return list(map(lambda x: ExpenseUtils.parse_data(x), all_expenses))

    @staticmethod
    def get_expense_by_id(id):
        return RootExpense.query.filter(RootExpense.id == int(id)).first()

    @staticmethod
    def create_new_expense(details):

        new_expense = RootExpense(
            owner_id = AuthUtils.get_current_user()['id'],
            name = details["name"],
            amount = details["amount"],
            expense_type = details["expense_type"]
        )

        try:
            db.session.add(new_expense)
            db.session.commit()
            return ExpenseUtils.parse_data(new_expense)

        except Exception as e:
            raise e


    @staticmethod
    def update_expense_by_id(id, details):
        # retrieve expense obj from db
        expense = ExpenseUtils.get_expense_by_id(int(id))

        # validate auth
        current_user = AuthUtils.get_current_user()['id']
        if not (current_user == expense['owner_id']):
            return Response(response="You are not authorized to edit this expense", status=403)

        # TO-DO expense details validator for POST & PUT

        # [try] Update db obj and commit changes
        try:
            expense['name'] = details["name"]
            expense['amount'] = details['amount']
            expense['expense_type'] = details['expense_type']
            # expense['is_equal'] = details['is_equal']
            # expense['transaction_date'] = details['transaction_date]
            db.session.commit()
        except Exception as e:
            raise e

        # grab updated obj from db and return it
        updated_expense = ExpenseUtils.get_expense_by_id(int(id))
        return ExpenseUtils.parse_data(updated_expense)


    @staticmethod
    def delete_expense_by_id(id):
        expense = ExpenseUtils.get_expense_by_id(int(id))

        if isinstance(expense, RootExpense) and AuthUtils.get_current_user()['id'] == expense.owner_id:
            db.session.delete(expense)
            db.session.commit()
            return {"message": "Deletion suceeded"}
        else:
            return {"message": "Not Authorized"}


# CHILD EXPENSES / PAYEES
class ChildExpenseUtils:
    @staticmethod
    def get_payees_by_expense(id):
        # child_expenses = ChildExpense.query.filter(ChildExpense.root_expense_id == id)
        # payees = []
        # for child in child_expenses:
        #     payee_id = child.user_id
        #     payee = User.query.filter(User.id == payee_id)
        #     payee = jsonify(payee)
        #     payees.append(payee)
        # return payees
        pass

    @staticmethod
    def add_payee_to_expense(expense_id, user_id):
        # current_payees = ChildExpenseUtils.get_payees_by_expense(id)
        # for payee in current_payees:
        #     if payee.user_id == user_id: return {"message": "User already added"}

        # new_child_expense = ChildExpense(
        #     root_expense_id = expense_id,
        #     user_id = user_id
        # )
        # db.session.add(new_child_expense)
        # db.session.commit()

        pass

class AuthUtils:
    @staticmethod
    def get_current_user():

        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")

class CommentUtils:
    @staticmethod
    def parse_data(comment_obj):
        try:
            return ({
                "id": comment_obj.id,
                "text": comment_obj.text,
                "expense_id": comment_obj.expense_id,
                "user_id": comment_obj.user_id,
                "created_at": comment_obj.created_at,
                "updated_at": comment_obj.updated_at
            })
        except:
            raise Exception("Invalid Expense Object from query")
    @staticmethod
    def get_all_comments(expense_id):
        all_comments = Comment.query.filter(Comment.expense_id == expense_id).all()

        return list(map(lambda x: CommentUtils.parse_data(x), all_comments))
    @staticmethod
    def create_new_comment(details, expense_id):
        new_comment = Comment(
            text=details["text"],
            expense_id=expense_id,
            user_id=AuthUtils.get_current_user()['id']
        )
        try:
            db.session.add(new_comment)
            db.session.commit()
            return CommentUtils.parse_data(new_comment)
        except Exception as e:
            raise e

    @staticmethod
    def get_comment_by_id(id):
        return Comment.query.filter(Comment.id == int(id)).first()

    @staticmethod
    def update_comment_by_id(details, comment_id):
        # retrieve expense obj from db
        comment = CommentUtils.get_comment_by_id(comment_id)
        # validate auth
        current_user = AuthUtils.get_current_user()['id']
        if not (current_user == comment.user_id):
            return Response(response="You are not authorized to edit this expense", status=403)

        # [try] Update db obj and commit changes
        try:
            comment.text = details["text"]
            db.session.commit()
        except Exception as e:
            raise e

        return CommentUtils.parse_data(comment)

    @staticmethod
    def delete_comment_by_id(comment_id):
        # retrieve expense obj from db
        comment = CommentUtils.get_comment_by_id(comment_id)
        # validate auth
        current_user = AuthUtils.get_current_user()['id']
        if not (current_user == comment.user_id):
            return {"message": "Not Authorized"}

        try:
            db.session.delete(comment)
            db.session.commit()
        except Exception as e:
            raise e

        return {"message": "Deletion succeeded"}
