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

const TOP_THRESHOLD = 100;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: true
    };

    this.onScroll = this.onScroll.bind(this);
    this.scrollY = 0;
    this.ticking = false;
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('scroll', this.onScroll, {
      passive: true
    });
  }

  onScroll() {
    this.scrollY = window.scrollY;
    this.requestTick();
  }

  checkTop() {
    this.setState({
      top: (this.scrollY < TOP_THRESHOLD)
    }, () => {
      this.ticking = false;
    });
  }

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => this.checkTop());
      this.ticking = true;
    }
  };

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
    const { top } = this.state;

    const cls = classNames(
      'layout',
      {
        'layout--not-top': !top
      }
    );

    const { href, text } = this.getLink(this.props['*']);

    return (
      <div className={cls}>
        <BtnLink
          className="layout__search"
          onClick={() => console.log('hiya')}>
          Type to search...
        </BtnLink>

        <BtnLink to="/" className="layout__logo">Friends of Kerouac</BtnLink>

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
