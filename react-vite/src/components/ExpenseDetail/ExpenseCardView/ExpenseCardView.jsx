import { useSelector } from "react-redux";
import "./ExpenseCardView.css";
import ExpenseTypeImage from "../../ExpenseTypeImage/ExpenseTypeImage";

export default function ExpenseCardView({ id }) {
  const root_expense = useSelector(
    (state) => state.expense.expense_details[id]
  );
  const user = useSelector((state) => state.session.user);
  const child_expenses = root_expense.child_expenses;
  let split_amount = null;
  let balance = null;
  let owe = null;
  if (child_expenses.length && user.id != root_expense.owner_id) {
    let my_child_expense = child_expenses.find((child) => child.user_id === user.id);
    split_amount = my_child_expense.split_amount;
    balance = my_child_expense.balance;
    owe = + (split_amount - balance).toFixed(2);
    

    // console.log(split_amount);
  }
  return (
    <div className="expense-details">
      <div id="expense-type-image">
        <ExpenseTypeImage type={root_expense.expense_type} />
      </div>
      <div className="expense-details-info">
        <div>
          <div className="expense-name-type">
            <p id="expense-name">{root_expense.name}</p>
            <p id="expense-type">{root_expense.expense_type}</p>
          </div>
          <p id="expense-amount">{`$${root_expense.amount}`}</p>
        </div>
        <p id="expense-date">{`For ${root_expense.transaction_date.slice(
          4,
          17
        )}`}</p>
        {user.id != root_expense.owner_id && (
          <p>{`Your balance: ${owe}`}</p>
        )}
        <p id="expense-desc">{`Added by ${root_expense.owner.first_name} ${
          root_expense.owner.last_name
        } on ${root_expense.created_at.slice(4, 17)}`}</p>
      </div>
    </div>
  );
}
