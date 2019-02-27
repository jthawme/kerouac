import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// 3rd Party Modules
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import Img from 'gatsby-image';
import Markdown from 'react-markdown';

// Redux
import { setFilter } from '../../state/actions/app';

// Components
import SEO from '../Common/SEO/SEO';
import BtnLink from '../Common/BtnLink/BtnLink';

// CSS, Requires
import styles from "./Person.module.scss";
import { getBookName } from '../../utils/books';

class Person extends React.Component {
  renderAppearances(appearances) {
    return Object.keys(appearances).map(a => {
      if (appearances[a]) {
        return (
          <li className={styles.appearanceItem} key={a}>
            <p className={styles.appearanceItemName}>{ appearances[a] }</p>
            <BtnLink onClick={() => this.props.setFilter(a) } className={styles.appearanceItemBook}>{ getBookName(a) }</BtnLink>
          </li>
        )
      }

      return null;
    });
  }

  render() {
    const { className, media, name, title, location, description, appearances } = this.props;

    const cls = classNames(
      className,
      styles.root
    );

    return (
      <div className={cls}>
        <SEO
          title={name}/>
        <Img backgroundColor={'#000'} className={styles.image} alt={media.node.name} {...media.node.image.file}/>
        <h1 className={styles.name}>{ name }</h1>
        <p className={styles.meta}>
          { location }<br/>
          { title }
        </p>
        <Markdown className={styles.description} source={ description }/>
        <ul className={styles.appearances}>
          { this.renderAppearances(appearances) }
        </ul>
      </div>
    );
  }
}

Person.propTypes = {
  className: PropTypes.string
};

Person.defaultProps = {
  className: null
};

const mapStateToProps = (store) => {
  return {
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
)(Person);
