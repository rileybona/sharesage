import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  addExpensePayees,
  getExpensePayees,
  getListOfPayees,
  updateAnExpense,
} from "../../redux/expense";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// import "./UpdateExpenseModal.css";

const EXPENSE_TYPE = ["Other", "Food", "Travel", "Utilites", "Home"];

const EXPENSE_TYPE_OPTIONS = EXPENSE_TYPE.map((e) => ({
  value: e,
  label: e,
}));

// console.log(EXPENSE_TYPE_OPTIONS);

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const convertDateSubmit = (dateString) => {
  const [month, day, year] = new Date(dateString)
    .addDays(2)
    .toLocaleDateString("en")
    .split("/");
  return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
};

const convertDateDisplay = (dateString) =>
  new Date(dateString).toLocaleDateString("en-CA");

export default function UpdateExpenseModal({ expenseId, setReload, reload }) {
  const sessionUser = useSelector((state) => state.session.user);
  //for prepopulating the form
  const curExpense = useSelector(
    (state) => state.expense.expense_details[expenseId]
  );
  //all users object from redux
  const userList = useSelector((state) => state.expense.payees);
  // existing payees associated with this root expense
  const existingPayees = useSelector((state) => state.expense.expense_details)[
    expenseId
  ].payees;
  //select options are constructed with the all-user list
  let selectOptions;
  //existing  payee emails parsed from existingPayees;
  let ogPayees;
  //default options gets constructed once existing payees are loaded;
  //default options is passed into the Select component in React DOM
  //for prepopulation;
  let defaultOptions;

  //parsing transaction date to locale date string for field population
  const transaction_date = new Date(
    curExpense.transaction_date
  ).toLocaleDateString("en-CA");
  //to include react select animations
  const animatedComponents = makeAnimated();

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState(curExpense.name);
  const [amount, setAmount] = useState(parseFloat(curExpense.amount));
  const [type, setType] = useState(curExpense.type);
  const [date, setDate] = useState(transaction_date);
  //state to reload component when users and existing payees gets fetched from the store
  const [userLoaded, setUserLoaded] = useState(false);
  const [existingPayeesLoaded, setExistingPayeesLoaded] = useState(false);
  //state to store selected users within the react select component
  const [selectedUsers, setSelectedUsers] = useState([]);

  const constructSelectOptions = (userList, payees) => {
    const initialOptions = [];
    const allOptions = Object.keys(userList).length
      ? [...Object.values(userList)].reduce((acc, user) => {
          const option = {
            value: user.email,
            label: `${user.first_name} ${user.last_name}`,
          };
          acc.push(option);
          if (payees.includes(user.email)) initialOptions.push(option);
          return acc;
        }, [])
      : [];
    return [allOptions, initialOptions];
  };

  const getExistingEmails = (usersObj) => {
    return Object.keys(usersObj).length
      ? Object.values(usersObj).reduce((acc, user) => {
          acc.push(user.email);
          return acc;
        }, [])
      : [];
  };

  useEffect(() => {
    dispatch(getListOfPayees()).then(() => setUserLoaded(true));
    dispatch(getExpensePayees(expenseId)).then(() =>
      setExistingPayeesLoaded(true)
    );
  }, [dispatch, expenseId]);

  if (userLoaded && existingPayeesLoaded) {
    ogPayees = getExistingEmails(existingPayees);
    [selectOptions, defaultOptions] = constructSelectOptions(
      userList,
      ogPayees
    );
  }

  if (!curExpense) return <h2>Something went wrong. </h2>;

  const handleChange = (e) => {
    setSelectedUsers(e.map((e) => e.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payeeCount = selectedUsers.length
      ? selectedUsers.length
      : defaultOptions.length;

    const split_amount = amount / payeeCount;
    const existingEmails = defaultOptions.map((e) => e.value);

    const childExpensePayload = {
      existing_payees: defaultOptions.reduce((acc, el) => {
        if (selectedUsers.includes(el.value)) {
          acc.push({
            email: el.value,
            split_amount,
          });
        }
        return acc;
      }, []),
      new_payees: selectedUsers.reduce((acc, el) => {
        if (!existingEmails.includes(el)) {
          acc.push({
            email: el,
            split_amount,
          });
        }
        return acc;
      }, []),
    };

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
    dispatch(updateAnExpense(expenseId, newExpense));
    dispatch(addExpensePayees(expenseId, childExpensePayload))
      .then(() => {
        setReload(reload + 1);
      })
      .then(closeModal);
  };

  //short curcuiting component if user list not loaded
  if (!userLoaded || !existingPayeesLoaded) return <h2>loading</h2>;
  return (
    <form onSubmit={handleSubmit}>
      <h1>Update expense</h1>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        isMulti
        onChange={(e) => {
          handleChange(e);
          // console.log(e);
        }}
        options={selectOptions}
        defaultValue={(() => {
          return defaultOptions;
        })()}
      />
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
