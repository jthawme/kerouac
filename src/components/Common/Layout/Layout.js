import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import 'focus-visible';

// Redux

// Components
import BtnLink from '../BtnLink/BtnLink';

// CSS, Requires
import "./Layout.scss";

class Layout extends React.Component {
  getLink(path) {
    switch (path) {
      case 'about':
        return {
          href: '/',
          text: 'Home'
        };
      default:
        return {
          href: '/about',
          text: 'About'
        };
    }
  }

  render() {
    const { children } = this.props;

    const cls = classNames(
      'layout'
    );

    const { href, text } = this.getLink(this.props['*']);

    return (
      <div className={cls}>
        <BtnLink
          className="layout__search"
          onClick={() => console.log('hiya')}>
          Type to search...
        </BtnLink>

        <p className="layout__logo">Friends of Kerouac</p>

        <BtnLink
          className="layout__link"
          to={ href }>
          { text }
        </BtnLink>

        { children }
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string
};

Layout.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
