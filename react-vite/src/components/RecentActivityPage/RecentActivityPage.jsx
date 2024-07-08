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
  const [reload, setReload] = useState(1);

  const myPayments = useSelector((state) => state.payment.payments);
  const Inboundpayments = useSelector((state) => state.payment.user_payments);

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.users);
  const allExpenses = useSelector((state) => state.expense.root_expenses);

  useEffect(() => {
    dispatch(getPayments()).then(() => setPaymentLoaded(true));
    dispatch(getAllUsers()).then(() => setUsersLoaded(true));
    dispatch(getAllExpenses()).then(() => setExpensesLoaded(true));
  }, [dispatch, reload]);

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

  // function preventDefault(e) {
  //   e.preventDefault();
  //   return;
  // }

  if (!paymentLoaded || !usersLoaded || !expenesesLoaded || !inPaymentLoaded)
    return <h2>Loading</h2>;
  return (
    <div className="recent-activity-container">
      <div className="received-container">
        <div className="div-title">
          <p id="received-title">Payments Received</p>{" "}
          <button
            style={{ width: "min-content" }}
            className="modal-button"
            onClick={() => setReload(reload + 1)}
          >
            Reload
          </button>
        </div>
        {Inboundpayments.map((e, ind) => {
          return (
            <div className="payment-card" key={`${e.id}` + `${ind}`}>
              <a href={`/expenses/${e.id}`}>
                <p>
                  <span style={{ color: "	#006400" }}>{`${
                    users[e.id].first_name
                  } ${users[e.id].last_name}`}</span>
                  {` sent me $${e.amount} on ${e.created_at.slice(4, 17)}`}
                </p>
              </a>
            </div>
          );
        })}
      </div>
      <div className="paid-container">
        <p className="div-title">Payments Made</p>
        {myPayments.map((e, ind) => {
          return (
            <div className="payment-card" key={`${e.id}` + `${ind}`}>
              <a href={`/expenses/${e.expense_id}`}>
                <p>
                  {`I paid`}
                  <span
                    style={{ color: "	#006400" }}
                  >{` ${e.recipient.first_name} ${e.recipient.last_name} `}</span>
                  {`$${e.amount} on ${e.created_at.slice(4, 17)}`}
                </p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
