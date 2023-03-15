import React from 'react';
import './App.css';
import Header from 'components/Header/Header';
import { Route, Routes } from 'react-router';
import AboutUs from 'components/AboutUs/AboutUs';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import Main from 'components/Main/Main';

class App extends React.Component {
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
