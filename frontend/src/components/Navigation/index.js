import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navigation-bar'>
      <div>
        <NavLink exact to="/" className="home-link">
          <div>
            <i className="fa-solid fa-house-user"></i>
          </div>
          <div>
            characterbnb
          </div>
        </NavLink>
      </div>
      <div>
        <a target='_blank' href="https://github.com/CaSandraSmith/characterBnB" className="about-links">
          <i className="fa-brands fa-github"></i> Github
        </a>
      </div>
      <div>
        <a target='_blank' href="https://www.linkedin.com/in/casandra-smith/" className="about-links">
          <i class="fa-brands fa-linkedin"></i> Linkedin
        </a>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;