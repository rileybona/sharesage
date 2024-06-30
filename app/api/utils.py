from os import name
from app.models import db, RootExpense
from flask_login import current_user
class ExpenseUtils: 
    @staticmethod
    def parse_data(expense_obj): 
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
    def delete_expense_by_id(id):
        expense = ExpenseUtils.get_expense_by_id(int(id))

        if isinstance(expense, RootExpense) and AuthUtils.get_current_user()['id'] == expense.owner_id: 
            db.session.delete(expense)
            db.session.commit()
            return {"message": "Deletion suceeded"}
        else: 
            return {"message": "Not Authorized"}

class AuthUtils: 
    @staticmethod 
    def get_current_user():

        if current_user.is_authenticated:
            return current_user.to_dict()
        else:  
            raise Exception("User not logged in")
