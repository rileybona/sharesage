import { useSelector } from "react-redux";
import "./ExpenseCardView.css";
import ExpenseTypeImage from "../../ExpenseTypeImage/ExpenseTypeImage";

export default function ExpenseCardView({ id }) {
  const root_expense = useSelector(
    (state) => state.expense.expense_details[id]
  );
  const user = useSelector((state) => state.session.user);
  return (
    <div className="expense-details">
      <div className="expense-type-image">
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
        <p id="expense-desc">{`Added by ${user.first_name} ${
          user.last_name
        } on ${root_expense.created_at.slice(4, 17)}`}</p>
      </div>
    </div>
  );
}
