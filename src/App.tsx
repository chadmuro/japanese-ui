import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import VocabularyDetails from './pages/VocabularyDetails';
import Category from './pages/Category';
import CategoryDetails from './pages/CategoryDetails';
import Study from './pages/Study';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/study" component={Study} />
        <Route path="/category/:id" component={CategoryDetails} />
        <Route path="/category" component={Category} />
        <Route path="/vocabulary/:id" component={VocabularyDetails} />
        <Route path="/vocabulary" component={Vocabulary} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
