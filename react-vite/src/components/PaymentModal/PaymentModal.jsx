import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addAPayment } from "../../redux/payment";
import "./PaymentModal.css"

const PAYMENT_METHODS = ["Cash", "Paypal", "Venmo"];

function PaymentModal({ expenseId, reload, setReload }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [amount, setAmount] = useState(0.0);
  const [note, setNote] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (!Object.keys(validationErrors).length) {
      const newPayment = {
        user_id: sessionUser.id,
        expense_id: expenseId,
        method,
        amount: Number(amount),
        note,
      };
      setReload(reload + 1);
      // setErrors({})
      // console.log(err);
      return dispatch(addAPayment(newPayment, expenseId)).then(() =>
        closeModal()
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="settle-up-form">
      <h1>Settle up</h1>
      <label>
        <select onChange={(e) => setMethod(e.target.value)}>
          {PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </label>
      <label>
      {showErrors && validationErrors.amount && (
          <p className="validation-error">{validationErrors.amount}</p>
        )}
        <input
          type="number"
          value={amount}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          required
        />
      </label>
      <label>
        <textarea
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ resize: "none" }}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default PaymentModal;
