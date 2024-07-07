import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.css";

function Sidebar({ hidden = false }) {
  // const sessionUser = useSelector(state => state.session.user);

  // function Layout() {
  //   const dispatch = useDispatch();
  //   const [isLoaded, setIsLoaded] = useState(false);

  //   useEffect(() => {
  //     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  //   }, [dispatch]);

  //   return (
  //     <>
  //       <Modal />
  //       <Navigation isLoaded={isLoaded} />
  //       {isLoaded && <Outlet />}
  //     </>
  //   );
  // }

  return (
    <nav id="sidebar">
      {hidden || (
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/recentActivity">Activities</NavLink>
          </li>
          <li>
            <NavLink to="/expenses">All Expenses</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Sidebar;
