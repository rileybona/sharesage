import { useEffect, useState } from "react";
import "./ExpensePayments.css";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../redux/payment";
import { getAllUsers } from "../../../redux/session";

export default function ExpensePaymentsView({ expenseId }) {
  const [loadPayments, setPayments] = useState(false);
  const [loadUsers, setLoadUsers] = useState(false);
  const dispatch = useDispatch();

  const payments = Object.values(useSelector((state) => state.payment.payment));

  console.log("payments: ", payments);

  const constructPaymentCard = (payment, index) => {
    return (
      <div key={index} className="payment-card">
        <p>{payment.note}</p>
        <p>someone paid someone {payment.amount}</p>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getPayments(expenseId)).then(() => setPayments(true));
    dispatch(getAllUsers()).then(() => setLoadUsers(true));
  }, [dispatch, expenseId]);
  if (!loadPayments && !loadUsers) return <h2>No payments</h2>;
  return (
    <div className="expense-payment-container">
      {payments.map((e, index) => constructPaymentCard(e, index))}
    </div>
  );
}
