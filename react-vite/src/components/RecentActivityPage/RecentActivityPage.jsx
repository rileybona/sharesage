import { useDispatch, useSelector } from "react-redux";
import "./RecentActivityPage.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  getUserInboundPayments,
  getUserOutboundPayments,
} from "../../redux/payment";
import { getAllUsers } from "../../redux/session";
import { NavLink } from "react-router-dom";

function PaymentCard({ payment, inbound, otherUser }) {
  return (
    <NavLink to={`/expenses/${payment.root_expense_id}`}>
      {inbound ? (
        <p>{`${otherUser.first_name} ${otherUser.last_name} paid me $${payment.amount}`}</p>
      ) : (
        <p>{`I paid ${otherUser.first_name} ${otherUser.last_name} ${payment.amount}`}</p>
      )}
      <p>click to view expense details</p>
    </NavLink>
  );
}

const constructPaymentsView = (payments, users, inbound = true) => {
  return (
    <div>
      <p>{inbound ? "Payments received" : "Payments made"} </p>
      {payments.map((e) => (
        <PaymentCard
          key={e.id}
          payment={e}
          inbound={inbound}
          otherUser={!inbound ? users[e.user_id] : users[e.recipient_id]}
        />
      ))}
    </div>
  );
};

export default function RecentActivityPage() {
  const dispatch = useDispatch();

  const payments = useSelector((state) => state.payment?.user_payments);
  const allUsers = useSelector((state) => state.session?.users);

  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [users, setUsers] = useState({});
  const [inbound, setInbound] = useState([]);
  const [outbound, setOutbound] = useState([]);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getUserInboundPayments());
    dispatch(getUserOutboundPayments());
    dispatch(getAllUsers());
    setPaymentLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (payments) {
      setInbound(payments.inbound);
      setOutbound(payments.outbound);
    }
    if (allUsers) setUsers(allUsers);
  }, [payments, allUsers]);

  if (!paymentLoaded) return <h1>loading...</h1>;
  return (
    <div className="recent-activity-container">
      {constructPaymentsView(inbound, users)}
      {constructPaymentsView(outbound, users, false)}
    </div>
  );
}
