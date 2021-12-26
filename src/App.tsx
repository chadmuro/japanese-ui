import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { InjectAxiosInterceptors } from './utils/injectInterceptors';
import Login from './pages/Login';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import VocabularyDetails from './pages/VocabularyDetails';
import Category from './pages/Category';
import CategoryDetails from './pages/CategoryDetails';
import Study from './pages/Study';
import RootPage from './pages/RootPage';

function App() {
  return (
    <Router>
      <InjectAxiosInterceptors />
      <Switch>
        <Route path="/study" component={Study} />
        <Route path="/category/:id" component={CategoryDetails} />
        <Route path="/category" component={Category} />
        <Route path="/vocabulary/:id" component={VocabularyDetails} />
        <Route path="/vocabulary" component={Vocabulary} />
        <Route path="/create" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/" component={RootPage} />
      </Switch>
    </Router>
  );
}

export default App;
