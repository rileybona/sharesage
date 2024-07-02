import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="sidebar">
        <ul>
            <li>
                <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/">Activities</NavLink>
            </li>
        </ul>
    </nav>
  );
}

export default Sidebar;
