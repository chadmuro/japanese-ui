import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';

function Routes() {
	return (
		<Switch>
			<Route path="/vocabulary" component={Vocabulary} />
			<Route path="/" component={Home} />
		</Switch>
	);
}

export default Routes;
