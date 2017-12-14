import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppLayout from './AppLayout';

class AppError extends React.Component {
  render() {
    const { error } = this.props;
    return error && (
      <section>
        <h1>App Error</h1>
        <p>{error.message}</p>
        {this.props.debugMode && (
          <details>
            <summary>Debug</summary>
            <code>
              {JSON.stringify(error, null, 2)}
            </code>
          </details>
        )}
      </section>
    );
  }
}

AppError.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  debugMode: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    code: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    instance: PropTypes.instanceOf(Error),
  }),
};

export default connect(({
  error,
  debugMode,
}) => ({ error, debugMode }))(AppError);
