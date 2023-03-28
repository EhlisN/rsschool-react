import AddPerson from 'components/AddPerson/AddPerson';
import Person from 'components/Person/Person';
import { IPerson } from 'components/state/IPerson';
import React, { useState } from 'react';
import style from './PersonPage.module.css';

const PersonPage = () => {
  const [items, setItems] = useState<IPerson[]>([]);

  const addCard = (card: IPerson) => {
    const newItems: IPerson[] = [...items, card];
    setItems(newItems);
  };

  return (
    <div className={style.formPage}>
      <div>Person</div>
      <AddPerson addCard={addCard} ind={items.length} />
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
