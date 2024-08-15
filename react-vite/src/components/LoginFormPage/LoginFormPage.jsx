import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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

    const serverResponse = dispatch(
      thunkLogin({
        email,
        password,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center gap-20 h-full">
      <p className="text-3xl font-bold mt-5">Welcome to ShareSage</p>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form
        id="login-form"
        className="flex flex-col gap-5 h-full justify-around"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 ">
          <label className="flex flex-col gap-3">
            Email
            <input
              className="border-2 p-2 px-4 rounded-full"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <label className="flex flex-col gap-3">
            Password
            <input
              className="border-2 p-2 px-4 rounded-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="flex flex-col gap-5">
          <button type="submit" className="border-2 p-2 rounded-full">
            Log In
          </button>
          <OpenModalButton
            className="border-2 p-2 rounded-full"
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
          <button className="border-2 p-2 rounded-full" onClick={loginDemo}>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
