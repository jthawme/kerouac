import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';

// Redux
import { setFilter } from '../../../state/actions/app';

// Components
import BtnLink from '../BtnLink/BtnLink';

// CSS, Requires
import { books, getBookName } from '../../../utils/books';
import styles from "./BookSelector.module.scss";

function isDesktop() {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.matchMedia(`(min-width: 768px)`).matches;
}

class BookSelector extends React.Component {
  state = {
    engaged: false
  }

  setFilter(filter) {
    if (!isDesktop()) {
      this.onDisengage();
    }

    this.props.setFilter(filter);
  }

  renderBook = (book) => {
    const cls = classNames(
      styles.item,
      {
        [styles.active]: this.props.filter === book
      }
    );

    return (
      <li key={book} className={cls}>
        <button className={styles.button} onClick={() => this.setFilter(book)}>
          <span className={styles.line}/>
          <span className={styles.label}>
            {books[book]}
          </span>
        </button>
      </li>
    )
  }

  onMouseEnter = (e) => {
    if (isDesktop()) {
      this.onEngage();
    }
  }

  onMouseLeave = (e) => {
    if (isDesktop()) {
      this.onDisengage();
    }
  }

  toggleEngage = () => {
    if (this.state.engaged) {
      this.onDisengage();
    } else {
      this.onEngage();
    }
  }

  onEngage = (e) => {
    this.setState({
      engaged: true
    });
  }

  onDisengage = (e) => {
    this.setState({
      engaged: false
    });
  }

  render() {
    const { className, filter } = this.props;
    const { engaged } = this.state;

    const cls = classNames(
      className,
      styles.root,
      {
        [styles.engaged]: engaged
      },
      {
        [styles.mobile]: isDesktop()
      }
    );

    return (
      <div className={cls} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <ScrollLock isActive={!isDesktop() && engaged}/>

        <div className={styles.overlay} onClick={this.onDisengage}/>

        <BtnLink className={styles.current} onClick={this.toggleEngage}>
          { getBookName(filter) }
          <span className={styles.currentHook}>{ engaged ? 'Close' : 'Change Book' }</span>
        </BtnLink>

        <TouchScrollable>
          <ul className={styles.list}>
            {
              Object.keys(books).map(this.renderBook)
            }
          </ul>
        </TouchScrollable>
      </div>
    );
  }
}

BookSelector.propTypes = {
  className: PropTypes.string
};

BookSelector.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
    filter: store.app.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFilter
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSelector);
