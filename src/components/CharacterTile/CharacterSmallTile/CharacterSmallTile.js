import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
import styles from "./CharacterSmallTile.module.scss";

const CharacterSmallTile = ({ className, image, displayName, name, alt, style }) => (
  <div className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={style}>
    <div className={styles.image}>
      { image }
    </div>
    <div className={styles.text}>
      <p className={styles.title}>{ displayName }</p>
      { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
    </div>
  </div>
);

CharacterSmallTile.propTypes = {
  className: PropTypes.string,
}

CharacterSmallTile.defaultProps = {
  className: null,
}

export default CharacterSmallTile;
