import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
// import AllExpensePage from "../components/AllExpensePage/AllExpensePage";
// import ExpenseDetail from "../components/ExpenseDetail/ExpenseDetail";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        <div className="main-content">
          <div className="left-bar">
            <Sidebar />
          </div>
          <div className="main">{isLoaded && <Outlet />}</div>
          <div className="right-bar">
            <Sidebar />
          </div>
        </div>
        <Modal />
      </ModalProvider>
    </>
  );
}
