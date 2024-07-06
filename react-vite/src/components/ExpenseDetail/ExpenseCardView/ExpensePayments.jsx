import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../redux/payment";
import "./ExpensePayments.css";
export default function ExpensePayments({ expenseId }) {
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const payments = useSelector((state) => state.payment.payments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPayments(expenseId)).then(() => setPaymentLoaded(true));
  }, [dispatch, expenseId]);

  console.log(JSON.stringify(payments));

  if (!paymentLoaded) return <h3>Loading</h3>;
  return (
    <div>
      {payments.map((payment) => (
        <div className="payment-card" key={payment.id}>
          <p>Payment Method: {payment.method}</p>
          <p>Paid ${payment.amount}</p>
          {payment.note && <p>Note: {payment.note}</p>}
        </div>
      ))}
    </div>
  );
}
