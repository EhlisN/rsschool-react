import { getProductById } from 'components/Api/Api';
import { IProduct } from 'components/state/IProducts';
import React, { useCallback, useEffect, useState } from 'react';
import style from './Product.module.css';
import Preloader from 'utils/Preloader/Preloader';

type PropsTypeProduct = {
  id: number;
  closeModal: () => void;
};

const Product = (props: PropsTypeProduct) => {
  const id = props.id;
  const [product, setProduct] = useState({} as IProduct);
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItemById = useCallback(async (id: number): Promise<void> => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      setImage(data.thumbnail);
      setImages(data.images);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const setId = id;
    getItemById(setId);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={style.card}>
          <button className={style.card__btn_close} type="button" onClick={props.closeModal}>
            X
          </button>
          <div className={style.show__img} style={{ backgroundImage: `url(${image})` }}></div>
          <div className={style.slide__img}>
            {images.map((img, ind) => (
              <img
                className=""
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
