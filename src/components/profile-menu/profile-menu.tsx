import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { forgotPasswordApi, logoutApi } from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { setUserData } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi()
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');

        dispatch(
          setUserData({
            user: {
              email: '',
              name: ''
            }
          })
        );
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
