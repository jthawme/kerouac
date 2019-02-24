import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux
import { setFilter } from '../../../state/actions/app';

// Components

// CSS, Requires
import { books } from '../../../utils/books';
import styles from "./BookSelector.module.scss";

class BookSelector extends React.Component {
  state = {
    engaged: false
  }

  setFilter(filter) {
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
    this.setState({
      engaged: true
    });
  }

  onMouseLeave = (e) => {
    this.setState({
      engaged: false
    });
  }

  render() {
    const { className } = this.props;
    const { engaged } = this.state;

    const cls = classNames(
      className,
      styles.root,
      {
        [styles.engaged]: engaged
      }
    );

    return (
      <div className={cls} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <ul className={styles.list}>
          {
            Object.keys(books).map(this.renderBook)
          }
        </ul>
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
