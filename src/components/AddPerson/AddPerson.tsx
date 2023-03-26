import React from 'react';
import style from './AddPerson.module.css';
import noPhoto from '../../assets/image/noPhoto.png';
import { IPerson } from 'components/state/IPerson';

type AddPersonType = {
  addCard: (card: IPerson) => void;
  ind: number;
};

class AddPerson extends React.Component<AddPersonType> {
  form: React.RefObject<HTMLFormElement>;
  imageInput: React.RefObject<HTMLInputElement>;
  nameInput: React.RefObject<HTMLInputElement>;
  descrInput: React.RefObject<HTMLTextAreaElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  genderInput: string;
  hobbyInput: string[];
  fileLink: string;

  constructor(props: AddPersonType) {
    super(props);
    this.form = React.createRef() as React.RefObject<HTMLFormElement>;
    this.imageInput = React.createRef();
    this.nameInput = React.createRef();
    this.dateInput = React.createRef();
    this.descrInput = React.createRef();
    this.statusSelect = React.createRef();
    this.genderInput = 'other';
    this.hobbyInput = [];
    this.fileLink = '';
  }

  state = {
    disabled: true,
    required: false,
    errorText: '',
    openForm: false,
  };

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!this.nameInput.current || !this.dateInput.current || !this.descrInput.current) return;

    if (!this.state.required) {
      await this.setState({ required: true });
      await this.checkFormValidation();
      if (this.state.disabled) return;
    }

    const target = e.target as HTMLFormElement;

    const card: IPerson = {
      id: this.props.ind,
      image: this.fileLink ? this.fileLink : noPhoto,
      name: this.nameInput.current.value,
      description: this.descrInput.current.value,
      dateOfBirth: this.dateInput.current.value,
      gender: this.genderInput,
      status: this.statusSelect.current?.value || 'free',
      hobby: this.hobbyInput.length !== 0 ? this.hobbyInput : ['No hobby'],
    };

    await this.props.addCard(card);

    alert('Card data has been saved');
    this.fileLink = '';
    this.genderInput = 'other';
    this.hobbyInput = [];
    target.reset();
    this.setState({ disabled: true, required: false });
  };

  handleFileInput = (e: React.SyntheticEvent) => {
    const reader = new FileReader();
    const target = e.target as HTMLInputElement;

    if (target.files) {
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const readerTarget = e.target as FileReader;
        this.fileLink = readerTarget.result?.toString() as string;
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  changeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target.value;
    this.genderInput = el;
  };

  changeCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const el = e.currentTarget.value;
    const ind = this.hobbyInput.indexOf(el);
    if (ind !== -1) {
      this.hobbyInput.splice(ind, 1);
      return;
    }
    this.hobbyInput.push(el);
  };

  checkFormValidation = () => {
    if (
      !this.nameInput.current ||
      this.nameInput.current.value === '' ||
      !this.dateInput.current ||
      !this.descrInput.current ||
      this.descrInput.current.value === ''
    ) {
      this.setState({ disabled: true });
      return;
    }
    this.setState({ disabled: this.form.current?.checkValidity() ? false : true });
  };

  checkName = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target.value;
    console.log(e.target.name);
    if (el[0] < 'A' || el[0] > 'Z') {
      this.setState({ errorText: `Incorrect ${e.target.name} data` });
    } else if (el.length === 0) {
      this.setState({ errorText: `Not empty ${e.target.name} data` });
    } else {
      this.setState({ errorText: '' });
    }
  };

  changeOpenForm = () => {
    this.state.openForm ? this.setState({ openForm: false }) : this.setState({ openForm: true });
  };

  render() {
    return (
      <div className={style.addPerson}>
        <button className={style.open__btn} type="button" onClick={this.changeOpenForm}>
          {this.state.openForm ? `Close form` : `Add person`}
        </button>
        {this.state.openForm ? (
          <form
            className={style.form}
            data-testid="form"
            onSubmit={this.handleSubmit}
            onChange={this.checkFormValidation}
            ref={this.form}
          >
            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Image: </label>
              <button className={style.form__file__button}>Выберите файл</button>
              <input
                className={style.form__file}
                type="file"
                placeholder="Attach flat image"
                accept="image/*"
                data-testid="file"
                onChange={this.handleFileInput}
                ref={this.imageInput}
              />
            </fieldset>
            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Full name: </label>
              <input
                className={style.form__name}
                type="name"
                name="name"
                placeholder="Start with a capital letter"
                data-testid="name"
                ref={this.nameInput}
                required={this.state.required}
                onChange={this.checkName}
              />
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Description: </label>
              <textarea
                className={style.form__desc}
                placeholder="Start with a capital letter"
                name="desc"
                data-testid="descr"
                ref={this.descrInput}
                required={this.state.required}
                onChange={this.checkName}
              />
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Date of birthday: </label>
              <input
                type="date"
                data-testid="date"
                className={style.form__date}
                placeholder="Input arrival date"
                ref={this.dateInput}
              />
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Gender: </label>
              <div className={style.form__radio}>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    defaultChecked
                    onChange={this.changeRadio}
                  />
                  <label> other</label>
                </div>
                <div>
                  <input type="radio" name="gender" value="male" onChange={this.changeRadio} />
                  <label> male</label>
                </div>
                <div>
                  <input type="radio" name="gender" value="female" onChange={this.changeRadio} />
                  <label> female</label>
                </div>
              </div>
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Status: </label>
              <select className={style.form__status} name="status" ref={this.statusSelect}>
                <option value="free">free</option>
                <option value="merried">married</option>
                <option value="widow">widow</option>
                <option value="divorced">divorced</option>
              </select>
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label className={style.form__label}>Hobby: </label>
              <div className={style.form__hobby}>
                <div>
                  <input type="checkbox" value="drawing" onClick={this.changeCheckbox} />
                  <label> Drawing</label>
                </div>
                <div>
                  <input type="checkbox" value="biking" onClick={this.changeCheckbox} />
                  <label> Biking</label>
                </div>
                <div>
                  <input type="checkbox" value="reading" onClick={this.changeCheckbox} />
                  <label> Reading</label>
                </div>
                <div>
                  <input type="checkbox" value="cooking" onClick={this.changeCheckbox} />
                  <label> Cooking</label>
                </div>
                <div>
                  <input type="checkbox" value="swimming" onClick={this.changeCheckbox} />
                  <label> Swiming</label>
                </div>
                <div>
                  <input type="checkbox" value="other" onClick={this.changeCheckbox} />
                  <label> Other</label>
                </div>
              </div>
            </fieldset>

            <fieldset className={style.form__fieldset}>
              <label>
                {this.state.errorText ? (
                  <span className={style.form__error}>{this.state.errorText}</span>
                ) : (
                  <span className={style.form__submit}>Submit your ad</span>
                )}
              </label>
              <input
                className={style.input__submit}
                type="submit"
                value="Submit"
                disabled={this.state.disabled}
                data-testid="submit"
              />
            </fieldset>
          </form>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default AddPerson;
