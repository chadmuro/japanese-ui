import { Redirect } from 'react-router-dom';

const RootPage = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Redirect to="/vocabulary" />;
};

export default RootPage;
