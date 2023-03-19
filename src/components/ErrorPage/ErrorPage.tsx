import React from 'react';
import style from './ErrorPage.module.css';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={style.errorPage}>
        404 <br /> Page Not Found
      </div>
    );
  }
}

export default ErrorPage;
