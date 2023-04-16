import React, { FormEvent, useState } from 'react';
import { setSearchValue } from 'redux/slices/searchSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import style from './Search.module.css';

const Search = () => {
  const searchData = useAppSelector((state) => state.searchSlice.stateSearch);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState(searchData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchValue(searchInput));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={style.search}>
        <span className={style.search__title}> &#128269;</span>
        <input
          className={style.search__input}
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleInputChange}
          role="value"
        />
        <button data-testid="search-button" className={style.search__btn} type="submit">
          Find
        </button>
      </div>
    </form>
  );
};

export default Search;
