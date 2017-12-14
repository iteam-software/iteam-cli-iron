import React from 'react';
import PropTypes from 'prop-types';

class AppFooter extends React.Component {
  render() {
    return (
      <footer>
        &copy; {this.props.copyright}
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
