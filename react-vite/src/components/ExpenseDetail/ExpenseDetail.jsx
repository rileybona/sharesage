import { useEffect, useState } from "react";
import "./ExpenseDetail.css";
import { useDispatch, useSelector } from "react-redux";
import * as expenseActions from "../../redux/expense";
import { useParams } from "react-router-dom";
import ExpenseCardView from "./ExpenseCardView";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExpenseModal from "../ExpenseModal/DeleteExpenseModal";
import UpdateExpenseModal from "../ExpenseModal/UpdateExpenseModal";
import Comments from "../Comments/Comments"

export default function ExpenseDetail() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [dispatchError, setDispatchError] = useState({});
  const { expenseId } = useParams();
  // proper auth verification:
  // NOTE: if current user != expense owner, expense toolbar won't show
  const user = useSelector((state) => state.session?.user);
  const expense = useSelector((state) => state.expense?.expense_details);
  // console.log({ user, expense });

  useEffect(() => {
    dispatch(expenseActions.getSingleExpense(parseInt(expenseId)))
      .then(() => setLoaded(true))
      .catch((error) => {
        setDispatchError({ message: error.message });
      });
  }, [dispatch, expenseId]);

  if (!loaded) return <h3>Loading</h3>;
  //for some reason, onModalClose triggers when on modal open...
  else {
    return (
      <div className="expense-details-container">
        {user.id == expense[expenseId].owner_id && (
          <div className="expense-toolbar">
            <OpenModalButton
              className="edit-expense"
              buttonText="Edit expense"
              modalComponent={
                <UpdateExpenseModal expenseId={parseInt(expenseId)} />
              }
              // onModalClose={() => navigate("/expenses")}
            />
            <OpenModalButton
              buttonText="Delete expense"
              modalComponent={
                <DeleteExpenseModal expenseId={parseInt(expenseId)} />
              }
              // onModalClose={() => navigate("/expenses")}
            />
          </div>
        )}
        {dispatchError.message && (
          <p className="error-message">dispatchError.message</p>
        )}
        <ExpenseCardView id={parseInt(expenseId)} />
        <br></br>
        <Comments />
      </div>
    );
  }
}
