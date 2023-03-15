import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className={style.navBar}>
        <Link className={style.item} to={'main'}>
          Main
        </Link>
        <Link className={style.item} to={'about'}>
          About Us
        </Link>
      </div>
    );
  }
}

export default NavBar;
