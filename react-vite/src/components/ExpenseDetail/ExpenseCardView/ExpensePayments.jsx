import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../../redux/payment";
import { getAllUsers } from "../../../redux/session";
import "./ExpensePayments.css";
export default function ExpensePayments({ expenseId }) {
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const payments = useSelector((state) => state.payment.payments);
  const users = useSelector((state) => state.session.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments(expenseId)).then(() => setPaymentLoaded(true));
  }, [dispatch, expenseId]);

  useEffect(() => {
    dispatch(getAllUsers()).then(() => setUsersLoaded(true));
  }, [dispatch, expenseId])

  console.log(JSON.stringify(payments));

  if (!paymentLoaded || !usersLoaded) return <h3>Loading</h3>;
  return (
    <div>
      {payments.map((payment) => (
        <div className="payment-card" key={payment.id}>
          <div>
            {" "}
            <p>
              {`${users[payment.user_id].first_name}`} paid ${payment.amount}{" "}
              via {payment.method} on {payment.created_at.slice(4, 17)}
            </p>
          </div>
          <div className="payment-note">
            {payment.note && (
              <p>
                Note: <span>{payment.note}</span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
