import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'

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
    const [date, setDate] = useState(new Date())


    const handleSubmit = (e) => {
        return
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
                defaultValue={new Date().toISOString().substring(0, 10)}
                required
                >
                </input>
            </label>
        </form>
    )
}

export default CreateExpenseModal;
