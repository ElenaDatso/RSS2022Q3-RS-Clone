import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import UserIcon from '../userIcon/UserIcon';

const Header = () => {
  return (
    <header className="header">
      <div className="header_inner">
        <div className="header_logo"></div>
        <nav className="header_menu">
          <ul className="header_menu-list">
            <li className="header_menu-item active">
              <span className="header_menu-text">Your work</span>
              <MdExpandMore className="header_menu-arrow" />
            </li>
            <li className="header_menu-item">
              <span className="header_menu-text">Projects</span>
              <MdExpandMore className="header_menu-arrow" />
            </li>
          </ul>
        </nav>
        <button className="header_create-btn">Create</button>
        <UserIcon user="OD"></UserIcon>
      </div>
    </header>
  );
};

export default Header;
