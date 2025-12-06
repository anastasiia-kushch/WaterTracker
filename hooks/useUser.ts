import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchUserData, addLogToUser } from '../store/userSlice';

export function useUser() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.status === 'idle') {
      dispatch(fetchUserData());
    }
  }, [dispatch, user.status]);

  const isLoading = user.status === 'loading';
  const isError = user.status === 'failed';

  const addLog = (amount: number) => dispatch(addLogToUser(amount));

  return {
    user,
    isLoading,
    isError,
    addLog,
    refetch: () => dispatch(fetchUserData()),
  };
}
