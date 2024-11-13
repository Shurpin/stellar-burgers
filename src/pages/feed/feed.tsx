import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeed,
  selectFeedIsLoading,
  selectFeedOrders
} from '../../slices/feedSlice';
import {
  fetchIngredients,
  selectIngredients
} from '../../slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedIsLoading);

  useEffect(() => {
    if (!ingredients?.length) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchFeed());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
