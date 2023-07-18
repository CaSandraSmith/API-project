import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const checkInputs = () => {
    if (!email || !username || !firstName || !lastName || !password || !confirmPassword) return true;
    if (username.length < 4) return true;
    if (password.length < 6) return true;
    return false
  }

  return (
    <div className="sign-up-from-wrapper">
      <h2>Sign Up</h2>
      {Object.values(errors).length ? <div className="sign-up-error-messages">
        {errors.email && <p>{errors.email}</p>}
        {errors.username && <p>{errors.username}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
      </div> : null}
      <form className="sign-up-from" onSubmit={handleSubmit}>
        <div>
          <label>
            <div>First Name</div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Last Name</div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <div>Email</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Username</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <div>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button className="signup-button" type="submit" disabled={checkInputs()}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;