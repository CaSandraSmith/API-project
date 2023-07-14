import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { clearUserSpots } from "../../store/spots";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(clearUserSpots())
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const profileButtonClassName = "profile-button" + (showMenu ? " menu-open" : "")

  return (
    <div className="options">
      <div>
        {user ? <NavLink to="/spots/new" className="create-spot-link">Create a New Spot</NavLink> : null}
      </div>
      <div className="profile-button-wrapper">
        <button className={profileButtonClassName} onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="menu user">
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <div onClick={() => history.push("/myBookings")}>Trips</div>
            <div className="manage-spots-wrapper">
              <NavLink to="/spots/current" className="manage-spots-link">Manage Spots</NavLink>
            </div>
            <button className="log-out-button" onClick={logout}>Log Out</button>
          </div>
        ) : (
          <div className="menu">
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;