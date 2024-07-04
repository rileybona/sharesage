import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav id="navbar">
      <div id="navbar-left">
        <NavLink to="/">
          <h3>Logo Placeholder</h3>
        </NavLink>
      </div>
      <div id="navbar-right">
        <ul>
          {/* <li>
            <NavLink to="/">Home</NavLink>
          </li> */}
          <li>
            <ProfileButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
