import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar() {
  const sessionUser = useSelector(state => state.session.user);

  
  function hiddenClass() {
    return sessionUser ? "" : "hidden";
  }

  function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);
  
    return (
      <>
        <Modal />
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
      </>
    );
  }

  return (
    <nav id="sidebar" className={hiddenClass()}>
        <ul id='side-content'>
            <NavLink to="/" className={'sidebar-navlink'}>
            <li>
                Dashboard
            </li>
            </NavLink>
            <NavLink to="/recentActivity" className={'sidebar-navlink'}>
            <li>
                Activities
            </li>
            </NavLink>
            <NavLink to="/expenses" className={'sidebar-navlink'}>
            <li>
                All Expenses
            </li>
            </NavLink>
        </ul>
    </nav>
  );
}

export default Sidebar;
