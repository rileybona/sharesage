import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateAnExpense } from "../../redux/expense";

const EXPENSE_TYPE = ["Other", "Food", "Travel", "Utilites"];

export default function UpdateExpenseModal({ expenseId, setReload, reload }) {
  const sessionUser = useSelector((state) => state.session.user);
  const curExpense = useSelector(
    (state) => state.expense.expense_details[expenseId]
  );

  const transaction_date = new Date(
    curExpense.transaction_date
  ).toLocaleDateString("en-CA");

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(curExpense.name);
  const [amount, setAmount] = useState(parseFloat(curExpense.amount));
  const [type, setType] = useState(curExpense.type);
  const [date, setDate] = useState(transaction_date);
  const [errors, setErrors] = useState({});
  const [validationError, setValidationError] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const errs = {};

    if (name.length <= 0 || name.length > 20)
      errs.name = "Name must not be empty or more than 20 characters long";
    if (amount < 0) errs.amount = "Expense cost should be greater than 0";
    //type is from a drop down list; there shouldn't be errors;
    setValidationError(errs);
    //TODO: add date validator
  }, [name, amount, date]);

  if (!curExpense) return <h2>Something went wrong. </h2>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(validationError).length > 0) {
      e.stopPropagation();
      return setShowErrors(true);
    }
    const newExpense = {
      owner_id: sessionUser.id,
      name,
      amount: Number(amount),
      expense_type: type,
    };

    if (date) {
      const newDate = new Date(date);
      const formatDate =
        newDate.getMonth() +
        1 +
        "/" +
        newDate.getDate() +
        "/" +
        newDate.getFullYear();
      newExpense.transaction_date = formatDate;
    }
    setErrors({});
    dispatch(updateAnExpense(expenseId, newExpense))
      .then(() => {
        setReload(reload + 1);
      })
      .then(closeModal);
    // const serverResponse = dispatch(updateAnExpense(expenseId, newExpense));

    // if (serverResponse) {
    //   setErrors(serverResponse);
    //   console.log(errors);
    // } else {
    //   setReload(reload + 1);
    //   closeModal;
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add an expense</h1>
      <label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a description"
          required
        />
      </label>
      {validationError.name && showErrors && (
        <p className="validation-error">{validationError.name}</p>
      )}
      <label>
        <input
          type="number"
          value={amount}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          required
        />
      </label>
      {validationError.amount && showErrors && (
        <p className="validation-error">{validationError.amount}</p>
      )}
      <label>
        <select onChange={(e) => setType(e.target.value)}>
          {EXPENSE_TYPE.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      {validationError.type && showErrors && (
        <p className="validation-error">{validationError.type}</p>
      )}
      <label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </label>
      {validationError.date && showErrors && (
        <p className="validation-error">{validationError.date}</p>
      )}
      <button type="submit">Save</button>
    </form>
  );
}
