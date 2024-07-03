import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { addAnExpense } from '../../redux/expense_modal';

const EXPENSE_TYPE = [
    "Other",
    "Food",
    "Travel",
    "Utilites",
];

function CreateExpenseModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal;
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0.00)
    const [type, setType] = useState(EXPENSE_TYPE[0])
    const [date, setDate] = useState("")
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit =  async (e) => {
        e.preventDefault();
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
        const serverResponse = await dispatch(
            addAnExpense(newExpense)
        )

        if (serverResponse) {
            setErrors(serverResponse);
            console.log(errors)
          } else {
            closeModal();
          }
    }

    return (
        <form onSubmit={(handleSubmit)}>
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
    )
}

export default CreateExpenseModal;
