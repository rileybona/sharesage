import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../redux/expense";

import "./DeleteExpenseModal.css";
import { useNavigate } from "react-router-dom";

export default function DeleteExpenseModal({ expenseId }) {
  const { closeModal } = useModal();
  //verification for auth checking should be done before this modal component:
  //  namely, on the expense details page.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const expense = useSelector(
    (state) => state.expense.expense_details[expenseId]
  );

  // console.log({ user, expense });

  const deleteExpense = (expenseId) => {
    try {
      if (user.id !== expense.owner_id) {
        closeModal;
      } else {
        console.log(`dispatching deletion`);
        dispatch(expenseActions.deleteAnExpense(parseInt(expenseId)))
<<<<<<< Updated upstream
          .then(navigate("/expenses"))
          .then(closeModal);
=======
          .then((result) => console.log(result))
          .then(navigate("/expenses"));
        closeModal;
>>>>>>> Stashed changes
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="delete-expense-modal">
      <p>{`Confirm Deleting ${expense.name}`}</p>
      <div>
        <a
          className="modal-button delete"
          onClick={() => {
            console.log("deleting expense");
            deleteExpense(expenseId);
          }}
        >
          DELETE
        </a>
        <a className="modal-button cancel" onClick={closeModal}>
          CANCEL
        </a>
      </div>
    </div>
  );
}
