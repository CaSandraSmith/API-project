import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const onclick = e => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
    .then(closeModal)
  }
  
  return (
    <div className="login-modal-wrapper">
      <h1>Log In</h1>
      {errors.credential && (
        <p className="credential-error">{errors.credential}</p>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          <div>Username or Email</div>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
        </label>
        <label>
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-form-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <Link className="demo-user-login" onClick={onclick} to='/'>Log in as Demo User</Link>
    </div>
  );
}

export default LoginFormModal;