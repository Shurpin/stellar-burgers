import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetOrderByNumberApi,
  fetchOrder,
  fetchUserOrdersApi,
  selectOrderData,
  selectUserOrders
} from '../../slices/orderSlice';
import {
  fetchIngredients,
  selectIngredients
} from '../../slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchUserOrdersApi());
  }, []);

  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
