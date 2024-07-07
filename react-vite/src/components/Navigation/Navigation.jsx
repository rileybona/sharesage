import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ landing }) {
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
          <img src="../../public/logo.png" id="logo-img"/>
        </NavLink>
        <NavLink to="/">
          <h3>ShareSage</h3>
        </NavLink>
      </div>
      <div className="wizardDoodles">
          <p>lil wizard1?</p>
          <img src="../../public/navwiz2.png" id="navWiz2"/>
          <p>lil wizard3?</p>
      </div>
      <div id="navbar-right">{landing || <ProfileButton />}</div>
    </nav>
  );
}

export default Navigation;
