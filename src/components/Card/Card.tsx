import { IProduct } from 'components/state/IProducts';
import React from 'react';
import style from './Card.module.css';

type PropsType = {
  item: IProduct;
};

class Card extends React.Component<PropsType> {
  render() {
    return (
      <div className={style.card} key={this.props.item.id}>
        <div className={style.card__img}>
          <img
            className={style.image}
            src={this.props.item.thumbnail}
            alt={this.props.item.title}
          />
        </div>
        <div className={style.card__description}>
          <h2 className={style.card__title}>{this.props.item.title}</h2>
          <div>
            <b>Brand: </b>
            {this.props.item.brand}
          </div>
          <div>
            <b>Category: </b>
            {this.props.item.category}
          </div>
          <div>
            <b>Description: </b>
            {this.props.item.description}
          </div>
          <div>
            <div className={style.price}>
              <div>
                Price: <s>{this.props.item.price}$</s>
              </div>
              <div>
                With discount:{' '}
                <span className={style.price__discount}>
                  {Math.round(
                    (this.props.item.price / 100) * (100 - this.props.item.discountPercentage)
                  )}
                  $
                </span>
              </div>
            </div>
            <div className={style.info}>
              <div>Rating: {this.props.item.stock}</div>
              <div>Stock: {this.props.item.price}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
