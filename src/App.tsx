import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import AboutUs from 'components/AboutUs/AboutUs';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import Main from 'components/Main/Main';
import { Navigate } from 'react-router-dom';
import { HeaderWithRouter } from 'components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeaderWithRouter />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/Error" replace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
