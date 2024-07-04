from os import name
from app.models import db, RootExpense, ChildExpense, User, Comment, Payment
from flask_login import current_user
from flask import Response
from datetime import datetime


class ExpenseUtils:
    """Root Expenses Ultilities"""

    @staticmethod
    def parse_time(time_str):
        format_str = "%m/%d/%Y"
        return datetime.strptime(time_str, format_str)

    @staticmethod
    def parse_data(expense_obj):
        """Parse RootExpense Object into python dictionary
        TODO: add more attributes
        """
        try:
            return {
                "id": expense_obj.id,
                "owner_id": expense_obj.owner_id,
                "name": expense_obj.name,
                "amount": expense_obj.amount,
                "expense_type": expense_obj.expense_type,
                "transaction_date": expense_obj.transaction_date,
                "created_at": expense_obj.created_at,
                "updated_at": expense_obj.updated_at,
            }
        except:
            raise Exception("Invalid Expense Object from query")

    @staticmethod
    def get_all_expenses():
        """Get all root expenses associated with the current user"""
        ownerId = AuthUtils.get_current_user()["id"]
        all_expenses = RootExpense.query.filter(
            RootExpense.owner_id == int(ownerId)
        ).all()
        child_exp_user = ChildExpenseUtils.get_expense_by_user()
        for exp in child_exp_user:
            rt_exp_id = exp["root_expense_id"]
            all_expenses.append(ExpenseUtils.get_expense_by_id(rt_exp_id))
        return list(map(lambda x: ExpenseUtils.parse_data(x), all_expenses))

    @staticmethod
    def get_expense_by_id(id):
        """Returns expense by id"""
        return RootExpense.query.filter(RootExpense.id == int(id)).first()

    @staticmethod
    def get_expense_details_by_id(id):
        """Returns expense details by expense ID"""
        expense = ExpenseUtils.parse_data(ExpenseUtils.get_expense_by_id(int(id)))
        child_expense_ids = map(
            lambda x: x.id,
            ChildExpense.query.filter(ChildExpense.root_expense_id == int(id)).all(),
        )
        expense["child_expenses"] = [
            ChildExpenseUtils.get_child_expense_details_by_id(x)
            for x in child_expense_ids
        ]
        payeeIds = [
            child_expense["user_id"] for child_expense in expense["child_expenses"]
        ]
        # return payeeIds
        if (AuthUtils.get_current_user()["id"] not in payeeIds) and not (
            AuthUtils.get_current_user()["id"] == expense["owner_id"]
        ):
            return 401
        return expense

    @staticmethod
    def create_new_expense(details):
        """Create an expense under the current user"""
        new_expense = RootExpense(
            owner_id=AuthUtils.get_current_user()["id"],
            name=details["name"],
            amount=details["amount"],
            expense_type=details["expense_type"],
        )

        if "transaction_date" in details:
            new_expense.transaction_date = ExpenseUtils.parse_time(
                details["transaction_date"]
            )

        try:
            db.session.add(new_expense)
            db.session.commit()
            return ExpenseUtils.parse_data(new_expense)

        except:
            return 500

    @staticmethod
    def update_expense_by_id(id, details):
        """Update an existing expense by id"""
        expense = ExpenseUtils.get_expense_by_id(int(id))

        current_user = AuthUtils.get_current_user()["id"]
        if not (current_user == expense.owner_id):
            return 403

        try:
            if "name" in details:
                expense.name = details["name"]
            if "amount" in details:
                expense.amount = details["amount"]
            if "expense_type" in details:
                expense.expense_type = details["expense_type"]
            # expense['is_equal'] = details['is_equal']
            if "transaction_date" in details:
                expense.transaction_date = ExpenseUtils.parse_time(
                    details["transaction_date"]
                )
            db.session.commit()
        except Exception:
            return 500

        # grab updated obj from db and return it
        updated_expense = ExpenseUtils.get_expense_by_id(int(id))
        return ExpenseUtils.parse_data(updated_expense)

    @staticmethod
    def delete_expense_by_id(id):
        """Delete an existing expense by ID"""
        expense = ExpenseUtils.get_expense_by_id(int(id))

        if (
            isinstance(expense, RootExpense)
            and AuthUtils.get_current_user()["id"] == expense.owner_id
        ):
            db.session.delete(expense)
            db.session.commit()
            return 0
        else:
            return -1


# CHILD EXPENSES / PAYEES
class ChildExpenseUtils:
    @staticmethod
    def parse_data(obj):
        """Return parsed data from ChildExpense objects"""
        try:
            return {
                "id": obj.id,
                "root_expense_id": obj.root_expense_id,
                "user_id": obj.user_id,
                "split_amount": obj.split_amount,
            }
        except:
            raise Exception("Invalid Child Expense Object from query")

    @staticmethod
    def get_payees_by_expense_id(id):
        """Returns payees info within their associated child expense obj"""
        child_expenses = ChildExpense.query.filter(
            ChildExpense.root_expense_id == int(id)
        ).all()
        payees = []
        users = []
        for expense in child_expenses:
            e = ChildExpenseUtils.parse_data(expense)
            owner = UserUtils.get_user_by_id(e["user_id"])
            e["owner"] = owner
            payees.append(e)
            users.append(owner)
        return payees, users

    @staticmethod
    def get_expense_by_user():
        """Returns all child expenses associated with user"""
        user_id = AuthUtils.get_current_user()["id"]
        child_expenses = ChildExpense.query.filter(
            ChildExpense.user_id == int(user_id)
        ).all()
        return list(map(lambda x: ChildExpenseUtils.parse_data(x), child_expenses))

    @staticmethod
    def update_child_expense_by_id(id, payload):
        """Returns updated child expense"""
        child_expense = ChildExpense.query.filter(ChildExpense.id == int(id)).first()
        if child_expense:
            if "split_amount" in payload:
                child_expense.split_amount = payload["split_amount"]
            db.session.commit()
        else:
            return {"message": f"Child expense {id} not updated"}

    @staticmethod
    def add_payee_to_expense(id, payload):
        """Returns updated child expenses and their associated users"""
        """payload structure
        {
            "existing_payees": [
                {
                    "email": "example1@gmail.com",
                    "split_amount": 14.24
                },
                {
                    "email": "example2@gmail.com",
                    "split_amount": 21.22
                }
            ],

            "new_payees": [
                {
                    "email": "example3@aol.com",
                    "split_amount": 12.34
                }
            ]
        }
        """
        # grab old child expenses from the database
        db_expenses = ChildExpenseUtils.get_payees_by_expense_id(id)

        if not len(db_expenses) == 0 and not len(db_expenses[0]) == 0:

            fe_old_expenses = payload["existing_payees"]
            # compare db expenses to payload 'previous expenses'

            for expense in db_expenses[0]:
                kill = True
                for payee in fe_old_expenses:
                    if expense["owner"]["email"] == payee["email"]:
                        ChildExpenseUtils.update_child_expense_by_id(
                            expense["id"], {"split_amount": payee["split_amount"]}
                        )
                        kill = False
                if kill:
                    expense = ChildExpense.query.filter(
                        ChildExpense.id == expense["id"]
                    ).first()
                    db.session.delete(expense)

        # create new child expenses for new payees
        for newbie in payload["new_payees"]:
            new_child_expense = ChildExpense(
                root_expense_id=id,
                user_id=UserUtils.get_user_by_email(newbie["email"]).id,
                split_amount=newbie["split_amount"],
            )
            try:
                db.session.add(new_child_expense)
                db.session.commit()
            except Exception as e:
                raise e

        # returns all updated / added child expenses and their users
        updated_children = ChildExpenseUtils.get_payees_by_expense_id(id)
        return updated_children

    @staticmethod
    def get_child_expense_details_by_id(id):
        """Get child expense details, including payments, by ID"""
        expense = ChildExpenseUtils.parse_data(
            ChildExpense.query.filter(ChildExpense.id == int(id)).first()
        )
        expense["payments"] = PaymentUtils.get_all_payments(int(id))
        return expense


class PaymentUtils:
    @staticmethod
    def parse_data(payment_obj):
        try:
            return {
                "id": payment_obj.id,
                "note": payment_obj.note,
                "expense_id": payment_obj.expense_id,
                "user_id": payment_obj.user_id,
                "method": payment_obj.method,
                "amount": payment_obj.amount,
                "created_at": payment_obj.created_at,
            }
        except:
            raise Exception("Invalid Payment Object from query")

    @staticmethod
    def get_all_payments(expense_id):
        all_payments = Payment.query.filter(Payment.expense_id == expense_id)

        return list(map(lambda x: PaymentUtils.parse_data(x), all_payments))

    @staticmethod
    def create_new_payment(details, expense_id):
        new_payment = Payment(
            note=details.get("note"),
            method=details.get("method"),
            amount=details.get("amount"),
            expense_id=expense_id,
            user_id=AuthUtils.get_current_user()["id"],
        )
        try:
            db.session.add(new_payment)
            db.session.commit()
            return PaymentUtils.parse_data(new_payment)
        except Exception as e:
            raise e

    @staticmethod
    def get_payments_by_user():
        user_id = AuthUtils.get_current_user()["id"]
        all_payments = Payment.query.filter(Payment.user_id == user_id)
        return list(map(lambda x: PaymentUtils.parse_data(x), all_payments))


class UserUtils:
    @staticmethod
    def parse_data(obj):
        """Parse User Object into python dictionary"""
        try:
            return {
                "id": obj.id,
                "username": obj.username,
                "email": obj.email,
                "first_name": obj.first_name,
                "last_name": obj.last_name,
                "avatar": obj.avatar,
            }
        except:
            raise Exception("Invalid User Object from query")

    @staticmethod
    def get_user_by_id(id):
        """Returns user info by id"""
        user = User.query.filter(User.id == int(id)).first()
        if not user:
            raise Exception("User not found")
        return UserUtils.parse_data(user)

    @staticmethod
    def get_user_by_email(email):
        """Returns parsed user info by their email"""
        return User.query.filter(User.email == str(email)).first()


class AuthUtils:
    @staticmethod
    def get_current_user():
        """Get the current user info"""
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")


class CommentUtils:
    @staticmethod
    def parse_data(comment_obj):
        try:
            return {
                "id": comment_obj.id,
                "text": comment_obj.text,
                "expense_id": comment_obj.expense_id,
                "user_id": comment_obj.user_id,
                "created_at": comment_obj.created_at,
                "updated_at": comment_obj.updated_at,
            }
        except:
            raise Exception("Invalid Expense Object from query")

    @staticmethod
    def get_all_comments(expense_id):
        all_comments = Comment.query.filter(Comment.expense_id == expense_id)

        return list(map(lambda x: CommentUtils.parse_data(x), all_comments))

    @staticmethod
    def create_new_comment(details, expense_id):
        new_comment = Comment(
            text=details.get("text"),
            expense_id=expense_id,
            user_id=AuthUtils.get_current_user()["id"],
        )
        try:
            db.session.add(new_comment)
            db.session.commit()
            return CommentUtils.parse_data(new_comment)
        except Exception as e:
            raise e

    @staticmethod
    def get_comment_by_id(id):
        return Comment.query.filter(Comment.id == int(id))

    @staticmethod
    def update_comment_by_id(details, comment_id):
        # retrieve expense obj from db
        comment = CommentUtils.get_comment_by_id(comment_id).first()
        # validate auth
        current_user = AuthUtils.get_current_user()["id"]
        if not (current_user == comment.user_id):
            return Response(
                response="You are not authorized to edit this expense", status=403
            )

        # [try] Update db obj and commit changes
        try:
            comment.text = details.get("text")
            db.session.commit()
        except Exception as e:
            raise e

        return CommentUtils.parse_data(comment)

    @staticmethod
    def delete_comment_by_id(comment_id):
        # retrieve expense obj from db
        comment = CommentUtils.get_comment_by_id(comment_id).first()
        # validate auth
        current_user = AuthUtils.get_current_user()["id"]
        if not (current_user == comment.user_id):
            return {"message": "Not Authorized"}

        try:
            db.session.delete(comment)
            db.session.commit()
        except Exception as e:
            raise e

        return {"message": "Deletion succeeded"}


class PaymentUtils:
    @staticmethod
    def parse_data(payment_obj):
        try:
            return {
                "id": payment_obj.id,
                "note": payment_obj.note,
                "expense_id": payment_obj.expense_id,
                "user_id": payment_obj.user_id,
                "method": payment_obj.method,
                "amount": payment_obj.amount,
                "created_at": payment_obj.created_at,
            }
        except:
            raise Exception("Invalid Payment Object from query")

    @staticmethod
    def get_all_payments(expense_id):
        all_payments = Payment.query.filter(Payment.expense_id == expense_id)

        return list(map(lambda x: PaymentUtils.parse_data(x), all_payments))

    @staticmethod
    def create_new_payment(details, expense_id):
        new_payment = Payment(
            note=details.get("note"),
            method=details.get("method"),
            amount=details.get("amount"),
            expense_id=expense_id,
            user_id=AuthUtils.get_current_user()["id"],
        )
        try:
            db.session.add(new_payment)
            db.session.commit()
            return PaymentUtils.parse_data(new_payment)
        except Exception as e:
            raise e

    @staticmethod
    def get_payments_by_user():
        user_id = AuthUtils.get_current_user()["id"]
        all_payments = Payment.query.filter(Payment.user_id == user_id)
        return list(map(lambda x: PaymentUtils.parse_data(x), all_payments))
