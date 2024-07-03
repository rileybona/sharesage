import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'

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


    const handleSubmit = (e) => {
        return
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
                />
            </label>
        </form>
    )
}

export default PaymentModal;
