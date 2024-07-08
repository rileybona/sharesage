import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.css";
import { useSelector } from "react-redux";

function Sidebar({ hidden = false }) {
  const user = useSelector((state) => state.session.user);

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

  return <nav id="sidebar"></nav>;
}

export default Sidebar;
