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
  gender: string;
  status: string;
  hobby: string[];
};

const AddPerson = (props: AddPersonType) => {
  const [openForm, setOpenForm] = useState(false);
  const [fileInfo, setFileInfo] = useState('No image');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPersonSubmitForm>();

  const onSubmit = async (data: AddPersonSubmitForm) => {
    const fileLink = await URL.createObjectURL(data.image[0]);
    const card = {
      ...data,
      image: fileLink ? fileLink : noPhoto,
      id: props.ind,
    };
    props.addCard(card);
    alert('Card data has been saved');
    reset();
    setFileInfo('No image');
  };

  const changeFileInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ind = e.target.value.lastIndexOf('\\');
    const name = e.target.value.slice(ind + 1);
    setFileInfo(name);
  };

  const isDateInPast = (nowDate: number, value: string | undefined) => {
    if (value === undefined) return false;
    const date = +new Date(value);
    return date <= nowDate;
  };

  const validationForm = {
    image: { required: 'Enter file', onChange: changeFileInfo },
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
    date: {
      required: 'Date is required',
      validate: (value: string) =>
        isDateInPast(Date.now(), value) || 'Release date should not be in the future data',
    },
    description: { required: 'Description is required' },
    status: { required: 'Status is required' },
    hobby: { required: 'Hobby is required' },
    gender: { required: 'Gender is required' },
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
            {errors.image ? (
              <span className={style.form__error__file}>{errors.image.message}</span>
            ) : (
              <span className={style.form__file__info}>{fileInfo}</span>
            )}
          </fieldset>
          <fieldset className={style.form__fieldset}>
            <label className={style.form__label}>Full name: </label>
            <input
              className={style.form__name}
              type="name"
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
                  id="other"
                  type="radio"
                  value="other"
                  {...register('gender', validationForm.gender)}
                />
                <label htmlFor="other"> other</label>
              </div>
              <div>
                <input
                  id="male"
                  type="radio"
                  value="male"
                  {...register('gender', validationForm.gender)}
                />
                <label htmlFor="male"> male</label>
              </div>
              <div>
                <input
                  id="female"
                  type="radio"
                  value="female"
                  {...register('gender', validationForm.gender)}
                />
                <label htmlFor="female"> female</label>
              </div>
            </div>
            {errors.gender && <span className={style.form__error}>{errors.gender.message}</span>}
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
                <input
                  id="drawing"
                  type="checkbox"
                  value="drawing"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="drawing"> Drawing</label>
              </div>
              <div>
                <input
                  id="biking"
                  type="checkbox"
                  value="biking"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="biking"> Biking</label>
              </div>
              <div>
                <input
                  id="reading"
                  type="checkbox"
                  value="reading"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="reading"> Reading</label>
              </div>
              <div>
                <input
                  id="cooking"
                  type="checkbox"
                  value="cooking"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="cooking"> Cooking</label>
              </div>
              <div>
                <input
                  id="swimming"
                  type="checkbox"
                  value="swimming"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="swimming"> Swiming</label>
              </div>
              <div>
                <input
                  id="otherChec"
                  type="checkbox"
                  value="other"
                  {...register('hobby', validationForm.hobby)}
                />
                <label htmlFor="otherChec"> Other</label>
              </div>
            </div>
            {errors.hobby && <span className={style.form__error}>{errors.hobby.message}</span>}
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
