import {Switch, Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';

import routes from './routes.json';
import NotFound from './NotFound';

const appRoutes = routes.map((r) => (
  <Route exact path={r.path} component={require(p.component)} key={r.path} />
));

const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      {appRoutes}
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);