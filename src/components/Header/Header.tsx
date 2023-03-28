import NavBar from '../NavBar/NavBar';
import React from 'react';
import style from './Header.module.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const page = pathname.substring(1, location.pathname.length) || 'Main';

  return (
    <div className={style.header}>
      <h1 className={style.logo}>My App</h1>
      <div className={style.pageName}>{page[0].toUpperCase() + page.slice(1)} Page</div>
      <NavBar />
    </div>
  );
};

export default Header;
