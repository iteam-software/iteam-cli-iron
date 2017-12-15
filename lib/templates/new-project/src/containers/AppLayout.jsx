import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import AppError from './AppError';
import AppFooter from './AppFooter';
import AppNav from './AppNav';

class AppLayout extends React.Component {
  render() {
    return (
      <div id="layout">
        <AppHeader />
        <AppNav />
        <main>
          <AppError />
          {this.props.children}
        </main>
        <AppFooter />
      </div>
    );
  }
}

AppLayout.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  layout: PropTypes.object.isRequired,
};

export default connect(({ layout }) => ({ layout }))(AppLayout);
