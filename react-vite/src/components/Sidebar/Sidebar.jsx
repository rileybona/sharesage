import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import * as sessionActions from "../../redux/session";

function Sidebar() {
  const user = useSelector((state) => state.session.user);

  // function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //   return (
  //     <>
  //       <Modal />
  //       <Navigation isLoaded={isLoaded} />
  //       {isLoaded && <Outlet />}
  //     </>
  //   );
  // }
  if (!isLoaded) return <h1>Loading</h1>;
  return (
    <nav id="sidebar">
      {user && (
        <ul>
          {user?.id && (
            <li>
              <NavLink to="/account/settings">
                <img
                  style={{ borderRadius: "50%", width: "50px" }}
                  src={`https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&size=250`}
                ></img>
              </NavLink>
            </li>
          )}
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
