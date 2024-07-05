import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getListOfPayees, updateAnExpense } from "../../redux/expense";
import Select from "react-select";

const EXPENSE_TYPE = ["Other", "Food", "Travel", "Utilites"];

export default function UpdateExpenseModal({ expenseId, setReload, reload }) {
  const sessionUser = useSelector((state) => state.session.user);
  const curExpense = useSelector(
    (state) => state.expense.expense_details[expenseId]
  );
  const userList = useSelector((state) => state.expense.payees);

  //parsing transaction date to locale date string for field population
  const transaction_date = new Date(
    curExpense.transaction_date
  ).toLocaleDateString("en-CA");

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(curExpense.name);
  const [amount, setAmount] = useState(parseFloat(curExpense.amount));
  const [type, setType] = useState(curExpense.type);
  const [date, setDate] = useState(transaction_date);
  const [userLoaded, setUserLoaded] = useState(false);

  console.log(userList);

  // const constructSelectOptions = (userList) => {
  //   return Object.values(userList).reduce((acc, el) => {
  //     const option = {value: }
  //   }, [])
  // };

  useEffect(() => {
    dispatch(getListOfPayees()).then(setUserLoaded(true));
  }, [dispatch]);

  if (!curExpense) return <h2>Something went wrong. </h2>;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    dispatch(updateAnExpense(expenseId, newExpense))
      .then(() => {
        setReload(reload + 1);
      })
      .then(closeModal);
  };

  //short curcuiting component if user list not loaded
  if (!userLoaded) return <h2>loading</h2>;
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

      <label>
        <select onChange={(e) => setType(e.target.value)}>
          {EXPENSE_TYPE.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
