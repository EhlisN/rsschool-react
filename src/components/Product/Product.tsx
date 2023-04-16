import { IProduct } from 'components/state/IProducts';
import React, { useState } from 'react';
import style from './Product.module.css';
import Preloader from 'utils/Preloader/Preloader';
import { useGetProductByIdQuery } from 'redux/api/api';

type PropsTypeProduct = {
  id: number;
  closeModal: () => void;
};

const Product = (props: PropsTypeProduct) => {
  const id = props.id;
  const { data: product = {} as IProduct, isLoading } = useGetProductByIdQuery(id);
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={style.card}>
          <button
            className={style.card__btn_close}
            data-testid="close-button"
            type="button"
            onClick={props.closeModal}
          >
            X
          </button>
          <div
            className={style.show__img}
            style={{ backgroundImage: `url(${image || product.thumbnail})` }}
          ></div>
          <div className={style.slide__img}>
            {product.images.map((img, ind) => (
              <img
                className={style.slide__img__small}
                key={ind}
                src={img}
                alt={product.title}
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <h1 className={style.card__title}>{product.title}</h1>
          <h3 className={style.card__brand}>Brand: {product.brand}</h3>
          <h5 className={style.card__category}>Category: {product.category}</h5>
          <p className={style.card__desc}>Description: {product.description}</p>

          <h5 className={style.card__price}>
            Price: <span>{product.price}$</span>
          </h5>
          <h3 className={style.card__discount}>
            Discount price:{' '}
            {Math.trunc(product.price - (product.price / 100) * product.discountPercentage)}$
          </h3>
          <div>
            <span className={style.card__rating}>Rating: {product.rating}</span>
            <span className={style.card__stock}>Stock: {product.stock}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
