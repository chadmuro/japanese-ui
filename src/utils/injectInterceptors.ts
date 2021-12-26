import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setupInterceptors } from './setupInterceptors';

export const InjectAxiosInterceptors = (): null => {
  const history = useHistory();

  useEffect(() => {
    setupInterceptors(history);
  }, [history]);

  return null;
};
