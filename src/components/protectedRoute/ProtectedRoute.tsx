import { Navigate } from 'react-router';
import React from 'react';
import { Preloader } from '@ui';
import { selectUserData, selectUserIsLoading } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuthenticated?: boolean;
};

export const ProtectedRoute = ({
  isAuthenticated,
  children
}: ProtectedRouteProps) => {
  const userIsLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectUserData);
  const token = localStorage.getItem('accessToken');

  if (userIsLoading) {
    return <Preloader />;
  }

  if (isAuthenticated && token && (user.name || user.email)) {
    return <Navigate replace to='/' />;
  }

  if (!isAuthenticated && !token && (!user.name || !user.email)) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
