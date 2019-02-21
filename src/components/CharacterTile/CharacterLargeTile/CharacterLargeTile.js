import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules

// Components

// CSS, Requires
import styles from "./CharacterLargeTile.module.scss";

const CharacterLargeTile = ({ className, image, displayName, name, alt, style }) => (
    <div className={`${className} ${styles.root} ${alt ? styles.alt : ''}`} style={style}>
      <div className={styles.text}>
        <p className={styles.title}>{ displayName }</p>
        { displayName ? <p className={styles.subtitle}>{ name }</p> : null }
      </div>
      <div className={styles.image}>
        { image }
      </div>
    </div>
);

CharacterLargeTile.propTypes = {
  className: PropTypes.string,
}

CharacterLargeTile.defaultProps = {
  className: null,
}

export default CharacterLargeTile;
