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

function getTimeout() {
  const visited = localStorage.getItem('visited');

  if (visited && visited >= 4) {
    return 2000;
  } else if (visited && visited >= 0) {
    return 4000;
  } else {
    return 8000;
  }
}

function advanceVisited() {
  localStorage.setItem('visited', localStorage.getItem('visited') ? localStorage.getItem('visited') + 1 : 0);
}

class FullQuote extends React.Component {
  state = {
    hide: false,
    help: false
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.onHide();
    }, getTimeout());

    setTimeout(() => {
      this.setState({
        help: true
      });
    }, 3000);

    advanceVisited();
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
    const { hide, help } = this.state;

    const cls = classNames(
      className,
      styles.root,
      {
        [styles.hide]: hide
      },
      {
        [styles.help]: help
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
        <span className={styles.helpBox}>Click anywhere</span>
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
