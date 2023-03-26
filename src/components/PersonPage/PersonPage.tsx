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

  render() {
    return (
      <div className={style.formPage}>
        <h2>Person Page</h2>
        <div>Add Person</div>
        <Person />
      </div>
    );
  }
}

export default PersonPage;
