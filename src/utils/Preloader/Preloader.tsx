import React from 'react';
import style from './Preloader.module.css';
import preloader from '../../assets/image/preloader.gif';

const Preloader = () => {
  return (
    <div className={style.preloader}>
      Loading...
      <img src={preloader} alt="Loading..." />
    </div>
  );
};

export default Preloader;
