import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Category from './pages/Category';

function Routes() {
	return (
		<Switch>
			<Route path="/category" component={Category} />
			<Route path="/vocabulary" component={Vocabulary} />
			<Route path="/" component={Home} />
		</Switch>
	);
}

export default Routes;
