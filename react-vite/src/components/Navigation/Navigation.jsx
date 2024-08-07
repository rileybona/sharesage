import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import imgUrl from "./coin.png";
import wizard from "./wizard.png";

function Navigation({ landing }) {
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
          <img style={{ height: "3em", padding: "0.5em" }} src={imgUrl} />
        </NavLink>
        <NavLink to="/">
          <h3>ShareSage</h3>
        </NavLink>
      </div>
      <div className="wizardDoodles">
        <p id="navWiz1">lil wizard1?</p>
        <img src={wizard} id="navWiz2" />
        <p id="navWiz3">lil wizard3?</p>
      </div>
      <div id="navbar-right">{landing || <ProfileButton />}</div>
    </nav>
  );
}

export default Navigation;
