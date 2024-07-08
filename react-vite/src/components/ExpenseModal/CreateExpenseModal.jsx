import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addAnExpense, getListOfPayees } from "../../redux/expense";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const EXPENSE_TYPE = [
    "Other",
    "Food",
    "Travel",
    "Utilites",
];

function CreateExpenseModal({ reload, setReload }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [type, setType] = useState(EXPENSE_TYPE[0]);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userLoaded, setUserLoaded] = useState(false);
  let selectOptions;

  const sessionUser = useSelector(state => state.session.user);
  const userList = useSelector(state => state.expense.payees);

    useEffect(() => {
        dispatch(getListOfPayees()).then(() => setUserLoaded(true))
    }, [dispatch])

    // Select Components
    const animatedComponents = makeAnimated();

    const constructSelectOptions = (userList) => {
        const allOptions = Object.keys(userList).length
          ? [...Object.values(userList)].reduce((acc, user) => {
              const option = {
                value: user.email,
                label: `${user.first_name} ${user.last_name}`,
              };
              acc.push(option);
              return acc;
            }, [])
          : [];
        return allOptions;
      };

    const handleSelect = (e) => {
        setSelectedUsers(e.map((e) => e.value));
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const payeeCount = selectedUsers.length

        const split_amount = amount / payeeCount;


    let childExpensePayload = null;
    if (selectedUsers.length) {
        childExpensePayload = {
            existing_payees: [],
            new_payees: selectedUsers.reduce((acc, el) => {
                acc.push({
                    email: el,
                    split_amount,
                });
                return acc;
            }, []),
        };
    }

        const newExpense = {
            owner_id: sessionUser.id,
            name,
            amount: Number(amount),
            expense_type: type,
        }

        if (date) {
            const newDate = new Date(date)
            const formatDate = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  newDate.getFullYear();
            newExpense.transaction_date = formatDate
        }
        setErrors({})
        dispatch(addAnExpense(newExpense, childExpensePayload))
        closeModal()
    }

    if (userLoaded) {
        selectOptions = constructSelectOptions(userList)
    }

    if (!userLoaded) return <h2>Loading...</h2>

    return (
        <>
            <form onSubmit={(handleSubmit)}>
                <h1>Add an expense</h1>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    isMulti
                    onChange={(e) => {
                        handleSelect(e);
                    }}
                    options={selectOptions}

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
                    <select
                    onChange={(e) => setType(e.target.value)}>
                        {EXPENSE_TYPE.map(type => (
                            <option
                            key={type}
                            value={type}>
                                {type}
                            </ option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    >
                    </input>
                </label>
                <button
                type="submit"
                >Save</button>
            </form>
            </>
    )
}

export default CreateExpenseModal;
