// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Main.css";
import LoginFormPage from "../LoginFormPage";
// import Sidebar from "../Sidebar/Sidebar";

function Main() {
  const user = useSelector((state) => state.session.user);
  if (!user?.id) return <LoginFormPage />;

  return (
    <>
      <h1>Welcome!</h1>
      <h3>Page under construction. Features coming soon!</h3>
    </>
  );
}

export default Main;
