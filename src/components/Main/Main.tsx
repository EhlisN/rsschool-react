import React from 'react';
import Card from 'components/Card/Card';
import { state } from 'components/state/state';
import style from './Main.module.css';
import { IProduct } from 'components/state/IProducts';

type MainStateType = {
  items: IProduct[];
  value: string;
};

class Main extends React.Component {
  state: MainStateType = {
    items: state,
    value: localStorage.getItem('value') || '',
  };

  componentDidMount() {
    if (!localStorage.getItem('value')) {
      localStorage.setItem('value', '');
    }
    const value = localStorage.getItem('value');
    const newState = this.searchItem(state, value!);
    this.setState({ items: newState, value: value });
  }

  componentWillUnmount() {
    localStorage.setItem('value', this.state.value!);
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newState = this.searchItem(state, e.target.value);
    this.setState({ items: newState, value: value });
  };

  searchItem = (array: IProduct[], value: string) => {
    if (value.length > 0) {
      return array.filter((item) =>
        item['title'].toLowerCase().includes(value.toLocaleLowerCase())
      );
    }
    return array;
  };

  render() {
    return (
      <div className={style.main}>
        <h2 className={style.name}>Main Page</h2>
        <div className={style.search}>
          <span className={style.search__title}> &#128269;</span>
          <input
            className={style.search__input}
            type="text"
            placeholder="Search"
            value={this.state.value || ''}
            onChange={this.onChange}
            role="value"
          />
        </div>
        <div className={style.cards}>
          {this.state.items.length > 0 ? (
            this.state.items.map((item) => {
              return <Card key={item.id} item={item} />;
            })
          ) : (
            <div>Do not find - {this.state.value}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
