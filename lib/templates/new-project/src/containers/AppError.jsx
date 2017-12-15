import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppLayout from './AppLayout';

class AppError extends React.Component {
  /**
   * Clear the current error
   */
  clearError() {
    const { dispatch } = this.props;
    dispatch({ type: '__IronApp__/Error:clear' });
  }

  render() {
    const { error } = this.props;
    if (!error.code) {
      return null;
    }

    return (
      <section id="global-error">
        <h3>App Error</h3>
        <p>{error.instance.message}</p>
        {this.props.debugMode && (
          <details open style={{marginTop: 20, marginBottom: 20}}>
          <summary>Debug</summary>
          <code>
          <dl>
          <dt>Code</dt>
          <dd><pre>{error.code}</pre></dd>
          <dt>Message</dt>
          <dd><pre>{error.instance.message}</pre></dd>
          <dt>Stack</dt>
          <dd><pre>{error.instance.stack}</pre></dd>
          </dl>
          </code>
          </details>
        )}
        <button onClick={this.clearError.bind(this)}>Ok</button>
      </section>
    );
  }
}

AppError.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  debugMode: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
    instance: PropTypes.instanceOf(Error),
  }),
};

export default connect(({
  error,
  debugMode,
}) => ({ error, debugMode }))(AppError);
