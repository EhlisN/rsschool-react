import NavBar from '../NavBar/NavBar';
import React from 'react';
import style from './Header.module.css';
import { withRouter, WithRouterProps } from 'utils/withRouter';

class Header extends React.Component<WithRouterProps> {
  render() {
    const { pathname } = this.props.location;
    const page = pathname.substring(1, location.pathname.length) || 'Main';
    return (
      <div className={style.header}>
        <h1 className={style.logo}>My App</h1>
        <div className={style.pageName}>{page[0].toUpperCase() + page.slice(1)} Page</div>
        <NavBar />
      </div>
    );
  }
}

export const HeaderWithRouter = withRouter(Header);
