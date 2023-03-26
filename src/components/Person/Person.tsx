import React from 'react';
import style from './Person.module.css';

class Person extends React.Component {
  render() {
    return <div className={style.person}>Person</div>;
  }
}

export default Person;
