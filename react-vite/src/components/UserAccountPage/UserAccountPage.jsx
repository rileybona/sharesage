import { useSelector } from "react-redux";
import "./UserAccountPage.css";

export default function UserAccountPage() {
  const user = useSelector((state) => state.session.user);

  if (!user) return <h2>Loading...</h2>;
  return (
    <div className="account-container">
      <div className="account-left-container">
        <div className="user-avatar-container">
          <img
            src={`https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&size=250`}
          ></img>
        </div>
      </div>
      <div className="account-right-container">
        <div>{`${user.first_name} ${user.last_name}`}</div>
        <div>{`${user.username}`}</div>
        <div>{`${user.email}`}</div>
      </div>
    </div>
  );
}
