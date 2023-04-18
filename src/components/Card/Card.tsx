import { IProduct } from 'components/interfaces/IProducts';
import React from 'react';
import style from './Card.module.css';

type PropsType = {
  item: IProduct;
  setModal: React.Dispatch<React.SetStateAction<number | null>>;
};

const Card = (props: PropsType) => {
  const item = props.item;
  const setModal = props.setModal;

  const openModal = () => {
    setModal(item.id);
  };

  return (
    <div className={style.card} key={item.id}>
      <div className={style.card__img}>
        <img className={style.image} src={item.thumbnail} alt={item.title} />
      </div>
      <div className={style.card__description}>
        <h2 className={style.card__title} onClick={openModal}>
          {item.title}
        </h2>
        <div>
          <b>Brand: </b>
          {item.brand}
        </div>
        <div>
          <b>Category: </b>
          {item.category}
        </div>
        <div>
          <div className={style.price}>
            <div>
              Price: <s>{item.price}$</s>
            </div>
            <div>
              With discount:{' '}
              <span className={style.price__discount}>
                {Math.round((item.price / 100) * (100 - item.discountPercentage))}$
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
