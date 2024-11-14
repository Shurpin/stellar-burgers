import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchLoginUserApi, setUserData } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';
import { loginUserApi, TRefreshResponse } from '@api';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    loginUserApi({ email, password })
      .then((response: TRefreshResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        setCookie('accessToken', response.accessToken);

        dispatch(setUserData(response));

        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
