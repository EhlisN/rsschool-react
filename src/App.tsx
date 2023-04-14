import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import AboutUs from 'components/AboutUs/AboutUs';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import { Navigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import PersonPage from 'components/PersonPage/PersonPage';
import Main from 'components/Main/Main';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/person" element={<PersonPage />} />
        <Route path="/Error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/Error" replace />} />
      </Routes>
    </div>
  );
};

export default App;