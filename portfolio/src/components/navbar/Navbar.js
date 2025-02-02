import React from 'react';
import logo from '../../img/logo1.png';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import DarkModeBtn from '../DarkModeBtn/DarkModeBtn';
import useGsapAnimation from '../../hooks/useGsapAnimation';

export default function Navbar() {
  const activeLink = 'nav-list__link nav-list__link--active';
  const normalLink = 'nav-list__link';

  useGsapAnimation('.logo', { y: -100, opacity: 0, duration: 2, ease: 'elastic.out' }, '.logo');
  useGsapAnimation('.nav-list__item', { y: -50, opacity: 0, duration: 2, ease: 'bounce.out', stagger: .2 }, '.nav-list__item');

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <NavLink to='/' className="logo">
            <img src={logo} height={80} width={100} alt='logo'/>
          </NavLink>

          <DarkModeBtn/>

          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink to='/' className={({ isActive }) => isActive ? activeLink : normalLink}>
                Home
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to='/projects' className={({ isActive }) => isActive ? activeLink : normalLink}>
                Projects
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink to='/contacts' className={({ isActive }) => isActive ? activeLink : normalLink}>
                Contacts
              </NavLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}
