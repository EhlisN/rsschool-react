import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import style from './Header.module.css';

class Header extends React.Component {
  render() {
    return (
      <div className={style.header}>
        <h1>Header</h1>
        <NavBar />
      </div>
    );
  }
}

export default Header;
