import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AppFooter extends React.Component {
  render() {
    const {footer} = this.props;
    const year = new Date().getFullYear();
    return (
      <footer>
        <p>&copy; {year} {footer.copyright}</p>
      </footer>
    );
  }
}

AppFooter.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  footer: PropTypes.shape({
    copyright: PropTypes.string.isRequired,
  }),
};

export default connect(({ footer }) => ({ footer }))(AppFooter);
