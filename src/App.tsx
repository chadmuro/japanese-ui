import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { InjectAxiosInterceptors } from './utils/injectInterceptors';
import Login from './pages/Login';
import Vocabulary from './pages/Vocabulary';
import VocabularyDetails from './pages/VocabularyDetails';
import Category from './pages/Category';
import CategoryDetails from './pages/CategoryDetails';
import Study from './pages/Study';
import RootPage from './pages/RootPage';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { checkAuth } from './store/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(checkAuth());
    }
  }, [user, dispatch, accessToken]);

  return (
    <Router>
      <InjectAxiosInterceptors />
      <Switch>
        <Route path="/study" component={Study} />
        <Route path="/category/:id" component={CategoryDetails} />
        <Route path="/category" component={Category} />
        <Route path="/vocabulary/:id" component={VocabularyDetails} />
        <Route path="/vocabulary" component={Vocabulary} />
        <Route path="/login" component={Login} />
        <Route path="/" component={RootPage} />
      </Switch>
    </Router>
  );
}

export default App;
