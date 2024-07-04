import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { addAnExpense } from '../../redux/expense_modal';

const PAYMENT_METHODS = [
    "Cash",
    "Paypal",
    "Venmo"
]


function PaymentModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal;
    const [method, setMethod] = useState(PAYMENT_METHODS[0])
    const [amount, setAmount] = useState(0.00)
    const [note, setNote] = useState("")
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPayment = {
            user_id: sessionUser.id,
            expense_id: 1,
            method: "Venmo",
            amount: 100,
            note: "Test Note"
        }

        setErrors({})
        const serverResponse = await dispatch(
            addAnExpense(newPayment, 1)
        )

        if (serverResponse) {
            setErrors(serverResponse);
          } else {
            closeModal();
          }
    }

    return (
        <form onSubmit={(handleSubmit)}>
            <h1>Settle up</h1>
            <label>
                <select
                onChange={(e) => setMethod(e.target.value)}>
                    {PAYMENT_METHODS.map(method => (
                        <option
                        key={method}
                        value={method}>
                            {method}
                        </ option>
                    ))}
                </select>
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
                <textarea
                type="text"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{"resize": "none"}}
                />
            </label>
            <button
            type="submit"
            >Save</button>
        </form>
    )
}

export default PaymentModal;
