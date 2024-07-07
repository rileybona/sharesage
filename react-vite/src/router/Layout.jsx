import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
// import AllExpensePage from "../components/AllExpensePage/AllExpensePage";
// import ExpenseDetail from "../components/ExpenseDetail/ExpenseDetail";
import Sidebar from "../components/Sidebar/Sidebar";
import LoginFormPage from "../components/LoginFormPage";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((state) => state.session?.user);
  useEffect(() => {
    if (user?.id) setIsLoggedIn(true);
  }, [user]);

  return (
    <>
      <ModalProvider>
        <Navigation landing={!isLoggedIn} />
        <div className="main-content">
          {isLoggedIn || <LoginFormPage landing={true} />}
          {isLoaded && isLoggedIn && (
            <>
              <div className="left-bar">
                <Sidebar />
              </div>
              <div className="main">
                <Outlet />
              </div>
              <div className="right-bar">
                <Sidebar />
              </div>
            </>
          )}
        </div>
        )
        <Modal />
      </ModalProvider>
    </>
  );
}
