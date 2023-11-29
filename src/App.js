import React from 'react';
import TodoTemplate from './components/todo/TodoTemplate';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Route, Routes } from 'react-router-dom';
// import { Login } from '@mui/icons-material';
import Join from './components/user/Join';
import Login from './components/user/Login';
import { AuthContextProvider } from './utils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    //데이터를 전달
    <AuthContextProvider>
      <div className='wrapper'>
        <Header />
        <div className='content-wrapper'>
          <Routes>
            <Route
              path='/'
              element={<TodoTemplate />}
            />

            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/join'
              element={<Join />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default App;
