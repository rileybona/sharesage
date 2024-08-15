import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [showValErrors, setShowValErrors] = useState("secret");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // useEffect for SignUp Validation Errors
  useEffect(() => {
    const errorObj = {};

    // email val: is email, has a length
    if (!email.includes("@") || !email.includes(".") || email.length < 3) {
      errorObj.email = "please input a valid email!";
    }

    // username
    if (username.length < 5) {
      errorObj.username = "username must be at least 5 characters.";
    }

    // firstname
    // last name
    // password length
    if (confirmPassword.length < 5) {
      errorObj.password = "password must be at least 5 characters";
    }
    setValErrors(errorObj);
  }, [email, username, confirmPassword]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if there are validation errors on submit
    if (Object.keys(valErrors).length > 0) {
      // display them & return without submitting
      setShowValErrors("seen");
      return;
    }

    // if passwords don't match return & display error
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = dispatch(
      thunkSignup({
        email,
        username,
        first_name: firstName,
        last_name: lastName,
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
      {errors.server && <p>{errors.server}</p>}
      <form id="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p className={showValErrors}>{valErrors.email}</p>
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
        <p className={showValErrors}>{valErrors.username}</p>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="seen">{errors.lastName}</p>}
        {showValErrors == "seen" ? (
          <p className={showValErrors}>{valErrors.password}</p>
        ) : (
          <p className="secret"></p>
        )}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="seen">{errors.confirmPassword}</p>
        )}
        <button id="signup-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
