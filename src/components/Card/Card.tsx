import { IProduct } from 'components/state/IProducts';
import React from 'react';
import style from './Card.module.css';

type PropsType = {
  item: IProduct;
};

const Card = (props: PropsType) => {
  const item = props.item;

  return (
    <div className={style.card} key={item.id}>
      <div className={style.card__img}>
        <img className={style.image} src={item.thumbnail} alt={item.title} />
      </div>
      <div className={style.card__description}>
        <h2 className={style.card__title}>{item.title}</h2>
        <div>
          <b>Brand: </b>
          {item.brand}
        </div>
        <div>
          <b>Category: </b>
          {item.category}
        </div>
        <div>
          <b>Description: </b>
          {item.description}
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
          <div className={style.info}>
            <div>Rating: {item.stock}</div>
            <div>Stock: {item.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
