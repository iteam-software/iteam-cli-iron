import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AppHeader extends React.Component {
  render() {
    const {header, name} = this.props;
    return (
      <header>
        {name}
      </header>
    );
  }
}

AppHeader.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  name: PropTypes.string.isRequired,
  header: PropTypes.object.isRequired,
};

export default connect(({header, name}) => ({header, name}))(AppHeader);
