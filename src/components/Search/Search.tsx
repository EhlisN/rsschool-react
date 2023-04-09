import React from 'react';
import style from './Search.module.css';

type PropsTypeSearch = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

const Search = (props: PropsTypeSearch) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  };
  return (
    <div className={style.search}>
      <span className={style.search__title}> &#128269;</span>
      <input
        className={style.search__input}
        type="text"
        placeholder="Search"
        value={props.value || ''}
        onChange={handleInputChange}
        role="value"
      />
    </div>
  );
};

export default Search;
