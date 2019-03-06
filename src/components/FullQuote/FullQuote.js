import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import classNames from 'classnames';

// Redux

// Components

// CSS, Requires
import styles from "./FullQuote.module.scss";

function isDesktop() {
  if (typeof window === 'undefined') {
    return true;
  }

  return (window.matchMedia(`(min-width: 768px)`).matches);
}

class FullQuote extends React.Component {
  state = {
    hide: false
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.onHide();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onHide = () => {
    this.setState({
      hide: true
    });
  }

  render() {
    const { className } = this.props;
    const { hide } = this.state;

    const cls = classNames(
      className,
      styles.root,
      {
        [styles.hide]: hide
      }
    );

    return (
      <div className={cls} onClick={this.onHide}>
        <blockquote className={styles.quote}>
          {
            isDesktop() ? (
              <>
                <span>I hope it is true that a man can die</span> <span>and yet not only live in others but give them life</span><span>, and not only life, but that great consciousness of life.</span>
              </>
            ) :
            "Maybe that's what life is... a wink of the eye and winking stars."
          }
        </blockquote>
        <cite className={styles.cite}>
          Jack Kerouac
        </cite>
      </div>
    );
  }
}

FullQuote.propTypes = {
  className: PropTypes.string
};

FullQuote.defaultProps = {
  className: null
};

export default React.memo(FullQuote);
