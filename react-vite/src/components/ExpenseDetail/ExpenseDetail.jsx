import { useEffect, useState } from "react";
import "./ExpenseDetail.css";
import { useDispatch, useSelector } from "react-redux";
import * as expenseActions from "../../redux/expense";
import { useParams } from "react-router-dom";
import ExpenseCardView from "./ExpenseCardView";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExpenseModal from "../ExpenseModal/DeleteExpenseModal";
import UpdateExpenseModal from "../ExpenseModal/UpdateExpenseModal";
import Comments from "../Comments/Comments";
import PaymentModal from "../PaymentModal/PaymentModal";
import ExpensePayments from "./ExpenseCardView/ExpensePayments";

export default function ExpenseDetail() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(1);
  const [dispatchError, setDispatchError] = useState({});
  const { expenseId } = useParams();
  // proper auth verification:
  // NOTE: if current user != expense owner, expense toolbar won't show
  const user = useSelector((state) => state.session.user);
  const expense = useSelector((state) => state.expense.expense_details);

  useEffect(() => {
    dispatch(expenseActions.getSingleExpense(parseInt(expenseId)))
      .then(() => setLoaded(true))
      .catch((error) => {
        setDispatchError({ message: error.message });
      });
  }, [dispatch, expenseId, reload]);

  // console.log(expense)

  if (!loaded) return <h3>Loading</h3>;
  //for some reason, onModalClose triggers when on modal open...
  else {
    const child_expense = expense[expenseId].child_expenses.find(
      (e) => e.user_id == user.id
    );
    return (
      <div className="expense-details-container">
        <div className="expense-toolbar">
          {user.id == expense[expenseId].owner_id ? (
            <>
              <OpenModalButton
                className="edit-expense"
                buttonText="Edit expense"
                modalComponent={
                  <UpdateExpenseModal
                    expenseId={parseInt(expenseId)}
                    setReload={setReload}
                    reload={reload}
                  />
                }
                // onModalClose={() => navigate("/expenses")}
              />
              <OpenModalButton
                buttonText="Delete expense"
                modalComponent={
                  <DeleteExpenseModal expenseId={parseInt(expenseId)} />
                }
                // onModalClose={() => navigate("/expenses")}
              />{" "}
            </>
          ) : (
            <OpenModalButton
              buttonText="Settle up"
              modalComponent={
                <PaymentModal
                  expenseId={child_expense.id}
                  rootExpId={child_expense.root_expense_id}
                  balance={child_expense.balance.toFixed(2)}
                  splitAmount={child_expense.split_amount}
                  ownerId={expense[expenseId].owner_id}
                  reload={reload}
                  setReload={setReload}
                />
              }
            />
          )}
        </div>

        {dispatchError.message && (
          <p className="error-message">dispatchError.message</p>
        )}
        <ExpenseCardView id={parseInt(expenseId)} />
        <br></br>
        <ExpensePayments expenseId={expenseId} />
        <Comments />
      </div>
    );
  }
}
