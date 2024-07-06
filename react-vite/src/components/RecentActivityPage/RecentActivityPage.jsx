import "./RecentActivityPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserPayments, getPayments } from "../../redux/payment";
import { getAllUsers } from "../../redux/session";
import { getAllExpenses } from "../../redux/expense";

export default function RecentActivityPage() {
  const dispatch = useDispatch();
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [expenesesLoaded, setExpensesLoaded] = useState(false);
  const [child_expenses, setChild_expenses] = useState([]);
  const [inPaymentLoaded, setInPaymentLoaded] = useState(false);

  const myPayments = useSelector((state) => state.payment.payments);
  const Inboundpayments = useSelector((state) => state.payment.user_payments);

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.users);
  const allExpenses = useSelector((state) => state.expense.root_expenses);

  useEffect(() => {
    dispatch(getPayments()).then(() => setPaymentLoaded(true));
    dispatch(getAllUsers()).then(() => setUsersLoaded(true));
    dispatch(getAllExpenses()).then(() => setExpensesLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    setChild_expenses(
      Object.values(allExpenses)
        .filter((e) => e.owner_id == sessionUser.id)
        .map((e) => e.id)
    );
  }, [allExpenses, expenesesLoaded, sessionUser.id]);

  useEffect(() => {
    dispatch(getCurrentUserPayments(child_expenses)).then(() =>
      setInPaymentLoaded(true)
    );
  }, [dispatch, child_expenses]);

  if (!paymentLoaded || !usersLoaded || !expenesesLoaded || !inPaymentLoaded)
    return <h2>Loading</h2>;
  return (
    <div className="recent-activity-container">
      <div className="received-container">
        <p>Payment Received</p>
        {Inboundpayments.map((e, ind) => {
          return (
            <div className="payment-card" key={`${e.id}` + `${ind}`}>
              <p>{`${users[e.id].first_name} ${
                users[e.id].last_name
              } sent me $${e.amount} on ${e.created_at}`}</p>
            </div>
          );
        })}
      </div>
      <div className="paid-container">
        <p>Payment Made</p>
        {myPayments.map((e, ind) => {
          return (
            <div className="payment-card" key={`${e.id}` + `${ind}`}>
              <p>{`I received $${e.amount} on ${e.created_at} from ${e.recipient.first_name} ${e.recipient.last_name}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
