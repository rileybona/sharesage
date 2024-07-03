import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./Main.css";
import Sidebar from "../Sidebar/Sidebar";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateExpenseModal from "../ExpenseModal/CreateExpenseModal";
import PaymentModal from "../PaymentModal/PaymentModal";

function Test() {
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <h1>Test Area</h1>
            <OpenModalButton
                buttonText="Add an expense"
                onButtonClick={closeMenu}
                modalComponent={<CreateExpenseModal />}
            />
            <OpenModalButton
              buttonText="Settle up"
              onButtonClick={closeMenu}
              modalComponent={<PaymentModal/>}
            />
        </>
        // <div className="main-content">
        //     <div className="left-bar">
        //        <Sidebar />
        //     </div>
        //     <div className="main">
        //         <h1>Welcome!</h1>
        //     </div>
        //     <div className="right-bar">
        //     <Sidebar />
        //     </div>
        // </div>
    )
}

export default Test;
