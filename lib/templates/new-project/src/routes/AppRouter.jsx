import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import routes from './';
import NotFound from './NotFound';

const appRoutes = routes.map((r) => {
  return (
    <Route exact path={r.path} component={r.component} key={r.path} />
  );
});

const AppRouter = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      {appRoutes}
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;