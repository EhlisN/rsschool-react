import AddPerson from 'components/AddPerson/AddPerson';
import Person from 'components/Person/Person';
import { IPerson } from 'components/state/IPerson';
import React from 'react';
import style from './PersonPage.module.css';

type FormPageType = {
  items: IPerson[] | [];
};

class PersonPage extends React.Component {
  state: FormPageType = {
    items: [],
  };

  addCard = (card: IPerson) => {
    const newState = this.state;
    newState.items = [...this.state.items, card];
    this.setState(newState);
  };

  render() {
    return (
      <div className={style.formPage}>
        <div>Person</div>
        <AddPerson addCard={this.addCard} ind={this.state.items.length} />
        {this.state.items.length === 0 ? (
          <div>No Person</div>
        ) : (
          <div className={style.persons}>
            {this.state.items.map((item) => {
              return <Person key={item.id} item={item} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default PersonPage;
