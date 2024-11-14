import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoadingIngredients
} from '../../slices/ingredientsSlice';
import { selectOrderBurgerIsLoading } from '../../slices/orderSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIsLoadingIngredients);
  const orderBurgerIsLoading = useSelector(selectOrderBurgerIsLoading);

  useEffect(() => {
    if (!ingredients?.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  return (
    <>
      {isIngredientsLoading || orderBurgerIsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
