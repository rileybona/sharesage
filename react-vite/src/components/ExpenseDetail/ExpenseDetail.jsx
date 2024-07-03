import { useEffect, useState } from "react";
import "./ExpenseDetail.css";
import { useDispatch } from "react-redux";
import * as expenseActions from "../../redux/expense";
import { useParams } from "react-router-dom";
import ExpenseCardView from "./ExpenseCardView";

export default function ExpenseDetail() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [dispatchError, setDispatchError] = useState({});
  const { expenseId } = useParams();
  //   return <h1>{`root expense Id: ${expenseId}`}</h1>;

  useEffect(() => {
    dispatch(expenseActions.getSingleExpense(parseInt(expenseId)))
      .then(() => setLoaded(true))
      .catch((error) => {
        setDispatchError({ message: error.message });
      });
  }, [dispatch, expenseId]);

  if (!loaded) return <h3>Loading</h3>;
  else {
    return (
      <div className="expense-details-container">
        <div className="expense-toolbar">
          <button className="edit-expense">Edit Expense</button>
          <button className="delete-expense">Delete Expense</button>
        </div>
        {dispatchError.message && (
          <p className="error-message">dispatchError.message</p>
        )}
        <ExpenseCardView id={parseInt(expenseId)} />
        <h3>Other Components go here</h3>
      </div>
    );
  }
}
