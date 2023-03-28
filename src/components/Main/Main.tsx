import React, { useEffect, useState } from 'react';
import Card from 'components/Card/Card';
import { state } from 'components/state/state';
import style from './Main.module.css';
import { IProduct } from 'components/state/IProducts';

const Main = () => {
  const [items, setItems] = useState(state);
  const [value, setValue] = useState(localStorage.getItem('value') || '');

  useEffect(() => {
    if (!localStorage.getItem('value')) {
      localStorage.setItem('value', '');
    }
    const newState = searchItem(state, value);
    setItems(newState);
    return () => localStorage.setItem('value', value);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newState = searchItem(state, e.target.value);
    setItems(newState);
    setValue(newValue);
  };

  const searchItem = (array: IProduct[], value: string) => {
    if (value.length > 0) {
      return array.filter((item) =>
        item['title'].toLowerCase().includes(value.toLocaleLowerCase())
      );
    }
    return array;
  };

  return (
    <div className={style.main}>
      <h2 className={style.name}>Main Page</h2>
      <div className={style.search}>
        <span className={style.search__title}> &#128269;</span>
        <input
          className={style.search__input}
          type="text"
          placeholder="Search"
          value={value || ''}
          onChange={onChange}
          role="value"
        />
      </div>
      <div className={style.cards}>
        {items.length > 0 ? (
          items.map((item) => {
            return <Card key={item.id} item={item} />;
          })
        ) : (
          <div>Do not find - {value}</div>
        )}
      </div>
    </div>
  );
};

export default Main;
