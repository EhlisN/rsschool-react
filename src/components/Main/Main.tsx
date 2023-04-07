import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from 'components/Card/Card';
import style from './Main.module.css';
import { IProduct } from 'components/state/IProducts';
import { getProducts } from 'components/Api/Api';
import Preloader from 'utils/Preloader/Preloader';
import Product from 'components/Product/Product';
import Search from 'components/Search/Search';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(localStorage.getItem('value') || '');
  const [modal, setModal] = useState<null | number>(null);
  const [items, setItems] = useState<IProduct[]>([]);
  const valueRef = useRef<string>();

  const getItems = useCallback(async (search: string): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getProducts(search);
      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getItems(value);
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      localStorage.setItem('value', valueRef.current || '');
    };
  }, []);

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
      <Search setValue={setValue} value={value} />
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={style.cards}>
          {items.length > 0 ? (
            items.map((item) => {
              return <Card key={item.id} item={item} setModal={setModal} />;
            })
          ) : (
            <div>Do not find - {value}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
