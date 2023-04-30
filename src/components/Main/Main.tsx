import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import style from './Main.module.css';
import Preloader from '../../utils/Preloader/Preloader';
import Product from '../../components/Product/Product';
import Search from '../Search/Search';
import { useGetProductsQuery } from '../../redux/api/api';
import { useAppSelector } from '../../redux/store';

const Main = () => {
  const searchData = useAppSelector((state) => state.searchSlice);
  const { data: items = [], isLoading } = useGetProductsQuery(searchData.stateSearch);
  const [modal, setModal] = useState<null | number>(null);

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className={style.main}>
      {modal ? (
        <div className={style.modal}>
          <div className={style.modal_close} onClick={closeModal}></div>
          <Product id={modal} closeModal={closeModal} />
        </div>
      ) : (
        <></>
      )}
      <h2 className={style.name}>Main Page</h2>
      <Search />
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={style.cards}>
          {items.length ? (
            items.map((item) => {
              return <Card key={item.id} item={item} setModal={setModal} />;
            })
          ) : (
            <div>Do not find - {searchData.stateSearch}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
