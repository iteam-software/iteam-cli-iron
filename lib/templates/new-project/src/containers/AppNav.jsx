import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class AppNav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.nav.items.map(({ to, caption }) => (
            <li key={caption}>
              <NavLink exact to={to}>
                {caption}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

AppNav.propTypes = {
  ...require('../lib/propTypeReactRedux'),
  nav: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      to: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })),
  }),
};

export default connect(({ nav }) => ({ nav }))(AppNav);