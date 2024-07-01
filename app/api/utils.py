from app.models import db, RootExpense, ChildExpense, User
from flask_login import current_user
from flask import Response

class ExpenseUtils:
    """ Root Expenses Ultilities """
    @staticmethod
    def parse_data(expense_obj):
        """ Parse RootExpense Object into python dictionary
        TODO: add more attributes
        """
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
        """ Get all root expenses associated with the current user """
        ownerId = AuthUtils.get_current_user()['id']
        all_expenses = RootExpense.query.filter(RootExpense.owner_id == int(ownerId)).all()
        child_exp_user = ChildExpenseUtils.get_expense_by_user()
        for exp in child_exp_user:
            rt_exp_id = exp['root_expense_id']
            all_expenses.append(ExpenseUtils.get_expense_by_id(rt_exp_id))
        return list(map(lambda x: ExpenseUtils.parse_data(x), all_expenses))

    @staticmethod
    def get_expense_by_id(id):
        """ Returns expense by id """
        return RootExpense.query.filter(RootExpense.id == int(id)).first()

    @staticmethod
    def create_new_expense(details):
        """ Create an expense under the current user """
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
        """ Update an existing expense by id"""
        # retrieve expense obj from db
        expense = ExpenseUtils.get_expense_by_id(int(id))

        # validate auth
        current_user = AuthUtils.get_current_user()['id']
        if not (current_user == expense.owner_id):
            return Response(response="You are not authorized to edit this expense", status=403)

        # TO-DO expense details validator for POST & PUT

        # [try] Update db obj and commit changes
        try:
            if "name" in details:
                expense.name = details["name"]
            if "amount" in details:
                expense.amount = details['amount']
            if "expense_type" in details:
                expense.expense_type = details['expense_type']
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
        """ Delete an existing expense by ID"""
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
    def parse_data(obj):
        """ Return parsed data from ChildExpense objects"""
        try:
            return {
                "id": obj.id,
                "root_expense_id": obj.root_expense_id,
                "user_id": obj.user_id,
                "split_amount": obj.split_amount
            }
        except:
            raise Exception("Invalid Child Expense Object from query")

    @staticmethod
    def get_payees_by_expense_id(id):
        """ Returns payees info within their associated child expense obj"""
        child_expenses = ChildExpense.query.filter(ChildExpense.root_expense_id == int(id)).all()
        payees = []
        for expense in child_expenses:
            e = ChildExpenseUtils.parse_data(expense)
            e["owner"] = UserUtils.get_user_by_id(e['user_id'])
            payees.append(e)
        return payees

    @staticmethod
    def get_expense_by_user():
        """ Returns all child expenses associated with user"""
        user_id = AuthUtils.get_current_user()['id']
        child_expenses = ChildExpense.query.filter(ChildExpense.user_id == int(user_id)).all()
        return list(map(lambda x: ChildExpenseUtils.parse_data(x), child_expenses ))

    @staticmethod
    def update_child_expense_by_id(id, payload):
        """ Returns updated child expense """
        child_expense = ChildExpense.query.filter(ChildExpense.id == int(id)).first()
        if child_expense:
            if "split_amount" in payload:
                child_expense.split_amount = payload["split_amount"] 
            db.session.commit()
        else:
            return {"message": f"Child expense {id} not updated"}

    @staticmethod
    def add_payee_to_expense(root_expense_id, payload):
        """ Returns updated child expenses and their associated users"""
        """payload structure
        {
            "new_user": {
                "id": int
                "split_amount": float
            },
            user1_email: {
                "split_amount": float //updated split_amount from frontend
            },
            user2_email: {
                "split_amount": float //updated split_amount from frontend
            }

        }
        """
        pass

class UserUtils:
    @staticmethod
    def parse_data(obj):
        """ Parse User Object into python dictionary """
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
        """ Returns user info by id """
        user = User.query.filter(User.id == int(id)).first()
        if not user:
            raise Exception("User not found")
        return UserUtils.parse_data(user)

    @staticmethod
    def get_user_by_email(email):
        """ Returns parsed user info by their email """
        pass

class AuthUtils:
    @staticmethod
    def get_current_user():
        """ Get the current user info """
        if current_user.is_authenticated:
            return current_user.to_dict()
        else:
            raise Exception("User not logged in")
