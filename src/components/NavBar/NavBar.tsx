import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div>
      <div className={style.navBar}>
        <Link className={style.item} to={'main'}>
          Main
        </Link>
        <Link className={style.item} to={'about'}>
          About Us
        </Link>
        <Link className={style.item} to={'person'}>
          Person
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
