import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { Link } from 'gatsby';

// Components

// CSS, Requires
import styles from "./CharacterSmallTile.module.scss";

const CharacterSmallTile = ({ className, image, displayName, name, alt, style, slug }) => (
  <Link to={ slug } className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={style}>
    <div className={styles.image}>
      { image }
    </div>
    <div className={styles.text}>
      <p className={styles.title}>{ displayName }</p>
      { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
    </div>
  </Link>
);

CharacterSmallTile.propTypes = {
  className: PropTypes.string,
}

CharacterSmallTile.defaultProps = {
  className: null,
}

export default CharacterSmallTile;
