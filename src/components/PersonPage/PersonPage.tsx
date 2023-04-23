import AddPerson from 'components/AddPerson/AddPerson';
import Person from 'components/Person/Person';
import React from 'react';
import style from './PersonPage.module.css';
import { useAppSelector } from 'redux/store';

const PersonPage = () => {
  const items = useAppSelector((state) => state.personSlice);

  return (
    <div className={style.formPage}>
      <div>Person</div>
      <AddPerson ind={items.length} />
      {items.length === 0 ? (
        <div>No Person</div>
      ) : (
        <div className={style.persons}>
          {items.map((item) => {
            return <Person key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PersonPage;
