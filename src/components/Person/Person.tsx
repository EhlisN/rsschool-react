import { IPerson } from 'components/state/IPerson';
import React from 'react';
import style from './Person.module.css';

class Person extends React.Component<{ item: IPerson }> {
  render() {
    return (
      <div className={style.person} data-testid="person">
        <div className={style.person__img}>
          <img src={this.props.item.image} alt="photo" />
        </div>
        <h3 className={style.person__name}>{this.props.item.name}</h3>
        <div className={style.person__desc}>
          <span className={style.info}>Description: </span>
          {this.props.item.description}
        </div>
        <div className={style.person__gender}>
          <span className={style.info}>Gender: </span>
          {this.props.item.gender}
        </div>
        <div className={style.person__bDay}>
          <span className={style.info}>Date of birthday: </span>
          {this.props.item.dateOfBirth}
        </div>
        <div className={style.person__status}>
          <span className={style.info}>Status: </span>
          {this.props.item.status}
        </div>
        <div className={style.person__hobby}>
          <span className={style.info}>Hobby: </span>
          {this.props.item.hobby.map((item, ind) => {
            return <span key={ind}>&#10003;{item} </span>;
          })}
        </div>
      </div>
    );
  }
}

export default Person;
