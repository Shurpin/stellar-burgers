import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import React, { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { setUserData } from '../../slices/userSlice';
import { getUserApi } from '@api';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserApi()
      .then((data) => {
        dispatch(setUserData(data));
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='feed number' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='profile orders' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
