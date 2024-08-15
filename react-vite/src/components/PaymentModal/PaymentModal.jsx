import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addAPayment } from "../../redux/payment";
import "./PaymentModal.css";

const PAYMENT_METHODS = ["Cash", "Paypal", "Venmo"];

function PaymentModal({
  expenseId,
  rootExpId,
  balance,
  splitAmount,
  ownerId,
  reload,
  setReload,
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [amount, setAmount] = useState(0.0);
  const [note, setNote] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errs = {};
    if (amount < 1) errs.amount = "Expense cost must be greater than 0";
    if (amount > ((splitAmount - balance).toFixed(2))) errs.amount = "Payment may not exceed balance."
    setValidationErrors(errs);
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (!Object.keys(validationErrors).length) {
      const newPayment = {
        user_id: sessionUser.id,
        expense_id: expenseId,
        root_expense_id: rootExpId,
        recipient_id: ownerId,
        method,
        amount: Number(amount),
        note,
      };
      // console.log("~PaymentModal new Payment");
      // console.log(newPayment);
      
      // setErrors({})
      // console.log(err);
      return dispatch(addAPayment(newPayment, expenseId)).then(() =>
        closeModal(),
        setReload(reload + 1)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="settle-up-form">
      <h1>Settle up</h1>
      <p>balance: {(splitAmount - balance).toFixed(2)}</p>
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
