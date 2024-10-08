import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const loginDemo = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    closeModal();
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
      closeModal();
    }
  };

  return (
    <>
      <form id="signin-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
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
        <button id="signin-button" type="submit">
          Log In
        </button>
        <button id="demo-user" onClick={loginDemo}>
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
