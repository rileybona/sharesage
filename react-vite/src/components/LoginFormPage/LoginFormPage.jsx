import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";
// import Navigation from "../Navigation/Navigation";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="landing-page-container">
      {/* <Navigation landing={true} /> */}
      <h1>Welcome to ShareSage</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form id="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="modal-button" type="submit">
          Log In
        </button>
        <OpenModalButton
          className="modal-button"
          id='landing-signup-button'
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
        <button className="modal-button" id="demo-user" onClick={loginDemo}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
