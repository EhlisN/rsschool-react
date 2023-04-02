import React, { useState } from 'react';
import style from './AddPerson.module.css';
import noPhoto from '../../assets/image/noPhoto.png';
import { IPerson } from 'components/state/IPerson';
import { useForm } from 'react-hook-form';

type AddPersonType = {
  addCard: (card: IPerson) => void;
  ind: number;
};

type AddPersonSubmitForm = {
  image: FileList;
  name: string;
  description: string;
  dateOfBirth: string;
  status: string;
};

const AddPerson = (props: AddPersonType) => {
  const [gender, setGender] = useState('other');
  const [hobby, setHobby] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [fileInfo, setFileInfo] = useState('No image');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPersonSubmitForm>();

  const onSubmit = async (data: AddPersonSubmitForm) => {
    const fileLink = await handleFileInput(data.image);
    const card = {
      ...data,
      image: fileLink ? fileLink : noPhoto,
      gender: gender,
      hobby: hobby.length ? hobby : ['No hobby'],
      id: props.ind,
    };
    props.addCard(card);
    alert('Card data has been saved');
    reset();
    setHobby([]);
    setGender('other');
    setFileInfo('No image');
  };

  const handleFileInput = async (image: FileList) => {
    if (image[0]) {
      const link = await URL.createObjectURL(image[0]);
      return link;
    }
  };

  const changeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target.value;
    setGender(el);
  };

  const changeCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const el = e.currentTarget.value;
    const ind = hobby.indexOf(el);
    if (ind !== -1) {
      hobby.splice(ind, 1);
      return;
    }
    hobby.push(el);
  };

  const changeFileInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ind = e.target.value.lastIndexOf('\\');
    const name = e.target.value.slice(ind + 1);
    setFileInfo(name);
  };

  const validationForm = {
    image: { required: false, onChange: changeFileInfo },
    name: {
      required: 'Name is required',
      pattern: {
        value: /^[A-Z]+[a-zA-Z]*$/,
        message: 'First letter must be capital',
      },
      minLength: {
        value: 3,
        message: 'Name must have at least 3 characters',
      },
    },
    date: { required: 'Date is required' },
    description: { required: 'Description is required' },
    status: { required: 'Status is required' },
  };

  const changeOpenForm = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
  };

  return (
    <div className={style.addPerson}>
      <button data-testid="open" className={style.open__btn} type="button" onClick={changeOpenForm}>
        {openForm ? `Close form` : `Add person`}
      </button>
      {openForm ? (
        <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Image: </label>
            <button className={style.form__file__button}>Add file</button>
            <input
              className={style.form__file}
              type="file"
              placeholder="Attach flat image"
              accept="image/*"
              data-testid="file"
              {...register('image', validationForm.image)}
            />
            <span className={style.form__file__info}>{fileInfo}</span>
          </fieldset>
          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Full name: </label>
            <input
              className={style.form__name}
              type="name"
              // name="name"
              placeholder="Enter name with a capital letter"
              data-testid="name"
              {...register('name', validationForm.name)}
            />
            {errors.name && <span className={style.form__error}>{errors.name.message}</span>}
          </fieldset>
          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Description: </label>
            <textarea
              className={style.form__desc}
              placeholder="Enter desription"
              // name="desc"
              data-testid="descr"
              {...register('description', validationForm.description)}
            />
            {errors.description && (
              <span className={style.form__error}>{errors.description.message}</span>
            )}
          </fieldset>

          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Date of birthday: </label>
            <input
              type="date"
              data-testid="date"
              className={style.form__date}
              placeholder="Input arrival date"
              {...register('dateOfBirth', validationForm.date)}
            />
            {errors.dateOfBirth && (
              <span className={style.form__error}>{errors.dateOfBirth.message}</span>
            )}
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
                  onChange={changeRadio}
                />
                <label> other</label>
              </div>
              <div>
                <input type="radio" name="gender" value="male" onChange={changeRadio} />
                <label> male</label>
              </div>
              <div>
                <input type="radio" name="gender" value="female" onChange={changeRadio} />
                <label> female</label>
              </div>
            </div>
          </fieldset>

          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Status: </label>
            <select className={style.form__status} {...register('status', validationForm.status)}>
              <option value=""></option>
              <option value="free">free</option>
              <option value="married">married</option>
              <option value="widow">widow</option>
              <option value="divorced">divorced</option>
            </select>
            {errors.status && <span className={style.form__error}>{errors.status.message}</span>}
          </fieldset>

          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Hobby: </label>
            <div className={style.form__hobby}>
              <div>
                <input type="checkbox" value="drawing" onClick={changeCheckbox} />
                <label> Drawing</label>
              </div>
              <div>
                <input type="checkbox" value="biking" onClick={changeCheckbox} />
                <label> Biking</label>
              </div>
              <div>
                <input type="checkbox" value="reading" onClick={changeCheckbox} />
                <label> Reading</label>
              </div>
              <div>
                <input type="checkbox" value="cooking" onClick={changeCheckbox} />
                <label> Cooking</label>
              </div>
              <div>
                <input type="checkbox" value="swimming" onClick={changeCheckbox} />
                <label> Swiming</label>
              </div>
              <div>
                <input type="checkbox" value="other" onClick={changeCheckbox} />
                <label> Other</label>
              </div>
            </div>
          </fieldset>
          <fieldset className={style.form__fieldset}>
            <label>
              {Object.keys(errors).length !== 0 ? (
                <span className={style.form__error__submit}>Data is not correct</span>
              ) : (
                <span className={style.form__submit}>Submit your ad</span>
              )}
            </label>
            <input
              className={style.input__submit}
              type="submit"
              value="Submit"
              data-testid="submit"
              disabled={Object.keys(errors).length !== 0}
            />
          </fieldset>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddPerson;
