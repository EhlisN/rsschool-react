import { IPerson } from 'components/state/IPerson';
import React from 'react';
import style from './Person.module.css';

type PersonType = {
  item: IPerson;
};

const Person = (props: PersonType) => {
  const item = props.item;

  return (
    <div className={style.person} data-testid="person">
      <div className={style.person__img}>
        <img src={item.image} alt="photo" />
      </div>
      <h3 className={style.person__name}>{item.name}</h3>
      <div className={style.person__desc}>
        <span className={style.info}>Description: </span>
        {item.description}
      </div>
      <div className={style.person__gender}>
        <span className={style.info}>Gender: </span>
        {item.gender}
      </div>
      <div className={style.person__bDay}>
        <span className={style.info}>Date of birthday: </span>
        {item.dateOfBirth}
      </div>
      <div className={style.person__status}>
        <span className={style.info}>Status: </span>
        {item.status}
      </div>
      <div className={style.person__hobby}>
        <span className={style.info}>Hobby: </span>
        {item.hobby.map((item, ind) => {
          return <span key={ind}>&#10003;{item} </span>;
        })}
      </div>
    </div>
  );
};

export default Person;
