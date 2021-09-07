import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import VocabularyDetails from './pages/VocabularyDetails';
import Category from './pages/Category';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/category" component={Category} />
        <Route path="/vocabulary/:id" component={VocabularyDetails} />
        <Route path="/vocabulary" component={Vocabulary} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
