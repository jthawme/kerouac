import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';

// Redux

// Components

// CSS, Requires
import { books } from '../../../utils/books';
import styles from "./BookSelector.module.scss";

class BookSelector extends React.Component {
  renderBook = (book) => {
    const cls = classNames(
      styles.item
    );

    return (
      <li key={book} className={cls}>
        <button className={styles.button} onClick={() => {}}>
          <span className={styles.line}/>
          <span className={styles.label}>
            {books[book]}
          </span>
        </button>
      </li>
    )
  }

  render() {
    const { className } = this.props;

    const cls = classNames(
      className,
      styles.root
    );

    return (
      <div className={cls}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookSelector);
