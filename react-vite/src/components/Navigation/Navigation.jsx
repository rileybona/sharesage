import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ landing }) {
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
          <img
            style={{ height: "3em", padding: "0.5em" }}
            src="public/coin.png"
          />
        </NavLink>
      </div>
      <div id="navbar-right">{landing || <ProfileButton />}</div>
    </nav>
  );
}

export default Navigation;
