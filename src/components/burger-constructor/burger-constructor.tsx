import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectBurgerConstructor } from '../../slices/burgerConstructorSlice';
import {
  fetchOrder,
  fetchOrderBurgerApi,
  selectOrderData,
  selectOrderIsLoading
} from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectBurgerConstructor);

  const orderRequest = useSelector(selectOrderIsLoading);

  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      fetchOrderBurgerApi(constructorItems.ingredients.map((item) => item._id))
    );
  };

  const closeOrderModal = () => {
    console.log('closeOrderModal', false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
