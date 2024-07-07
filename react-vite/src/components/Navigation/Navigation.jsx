import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ landing }) {
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
          <h3>Logo Placeholder</h3>
        </NavLink>
      </div>
      <div id="navbar-right">
        <ul>
          {landing || (
            <li>
              <ProfileButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
