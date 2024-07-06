// import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Main.css";
// import Sidebar from "../Sidebar/Sidebar";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateExpenseModal from "../ExpenseModal/CreateExpenseModal";
import PaymentModal from "../PaymentModal/PaymentModal";
import { getPayments } from "../../redux/payment";

function Test() {
  //   const [showMenu, setShowMenu] = useState(false);
  //   const closeMenu = () => setShowMenu(false);
  const dispatch = useDispatch();
  const expenseId = null;
  const payments = useSelector((state) => state.payment.payments);

  useEffect(() => {
    dispatch(getPayments(expenseId));
  }, [dispatch, expenseId]);

  console.log(payments);

  if (!payments) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>Test Area</h1>
      <OpenModalButton
        buttonText="Add an expense"
        // onButtonClick={closeMenu}
        modalComponent={<CreateExpenseModal />}
      />
      <OpenModalButton
        buttonText="Settle up"
        // onButtonClick={closeMenu}
        modalComponent={<PaymentModal />}
      />
      {/* <div id = "payment">
                {payments ? payments.map(payment => (
                    <div>{payment.id}</div>
                )): <></>}
            </div> */}
    </>
  );
}

export default Test;
